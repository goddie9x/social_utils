const { IncorrectPermission } = require('../exceptions/commonExceptions');
const { ROLES } = require('../constants/users');

const checkOwnershipOrAdmin = (req, res, next) => {
    let { id } = req.params;
    if (!id) {
        id = req.body.id;
    }
    const currentUser = req.body.currentUser;

    // Require authentication - unauthenticated users have no userId
    if (!currentUser?.userId) {
        return next(new IncorrectPermission());
    }
    // Non-admin users can only act on their own resources.
    // Unknown (0) is not Admin/Mod, so it falls through to the permission check.
    if (id !== currentUser.userId && currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.MOD) {
        return next(new IncorrectPermission());
    }
    next();
};

module.exports = checkOwnershipOrAdmin;