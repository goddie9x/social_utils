const { IncorrectPermission } = require('../exceptions/commonExceptions');
const { ROLES } = require('../constants/users');

const checkOwnershipOrAdmin = (req, res, next) => {
    let { id } = req.params;
    if (!id) {
        id = req.body.id;
    }
    const currentUser = req.body.currentUser;

    if (id !== currentUser.userId && currentUser.role === ROLES.USER) {
        return next(new IncorrectPermission());
    }
    next();
};

module.exports = checkOwnershipOrAdmin;