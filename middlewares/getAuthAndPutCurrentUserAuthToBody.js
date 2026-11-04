const crypto = require('crypto');

// Shared secret with the API gateway. The gateway verifies the JWT, then
// signs the X-Current-User payload with HMAC-SHA256. Services must verify
// the signature before trusting the header - otherwise anyone can forge
// X-Current-User and impersonate any user (including Admin).
const INTERNAL_HMAC_SECRET = process.env.INTERNAL_HMAC_SECRET;

const verifySignature = (payload, signature) => {
    if (!INTERNAL_HMAC_SECRET || !signature || !payload) {
        return false;
    }
    const expected = crypto
        .createHmac('sha256', INTERNAL_HMAC_SECRET)
        .update(payload)
        .digest('hex');
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
};

const getAuthAndPutCurrentUserAuthToBody = (req, res, next) => {
    const currentUserJson = req.headers['x-current-user'];

    if (!currentUserJson) {
        return next();
    }

    // If the HMAC secret is configured, the header is only trusted when it
    // carries a valid gateway signature.
    if (INTERNAL_HMAC_SECRET) {
        const signature = req.headers['x-internal-signature'];
        if (!signature) {
            // No signature = not coming through the gateway.
            // Treat as unauthenticated rather than trusting a forgeable header.
            return next();
        }
        if (!verifySignature(currentUserJson, signature)) {
            console.error('Rejected forged X-Current-User header: invalid HMAC signature');
            return res.status(401).json({ error: 'Invalid internal auth signature' });
        }
    } else {
        console.warn(
            'INTERNAL_HMAC_SECRET is not set - trusting X-Current-User without ' +
            'signature verification. Set the secret in production.'
        );
    }

    try {
        const currentUser = JSON.parse(currentUserJson);
        req.body = req.body || {};
        req.body.currentUser = currentUser;
    } catch (e) {
        console.error('Failed to parse X-Current-User header:', e);
    }

    next();
}

module.exports = getAuthAndPutCurrentUserAuthToBody;
module.exports.verifySignature = verifySignature;
