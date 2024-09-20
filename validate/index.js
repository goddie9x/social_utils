const { TargetNotExistException, TargetAlreadyExistException } = require('../exceptions/commonExceptions');

const validateTargetNotExistThrowException = (target, stringThrow) => {
    if (!target) {
        throw new TargetNotExistException((stringThrow ?? 'Target') + ' not exist');
    }
}

const validateTargetAlreadyExistThrowException = (target, stringThrow) => {
    if (target) {
        throw new TargetAlreadyExistException((stringThrow ?? 'Target') + ' already exist');
    }
}

module.exports = {
    validateTargetNotExistThrowException,
    validateTargetAlreadyExistThrowException,
}