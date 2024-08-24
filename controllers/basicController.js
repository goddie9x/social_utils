const { CommonException } = require('../exceptions/commonExceptions');

class BasicController {
    handleResponseError(res, error) {
        if (error instanceof CommonException) {
            return res.status(error.statusCode).json(error.message);
        }
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}

module.exports = BasicController;