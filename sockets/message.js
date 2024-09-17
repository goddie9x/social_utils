const { MESSAGE_CHANNEL } = require('../constants/socketChannel');
const authSocketMiddleware = require('../middlewares/authSocketMiddleware');
const { mappingSocketBuilder } = require('.');
const messageSocketBuilder = (io) => {
    mappingSocketBuilder({
        io,
        middlewares: [authSocketMiddleware],
        namespace: MESSAGE_CHANNEL.NAMESPACE,
        builder: (namespace) => {
            namespace.on('connection', (socket) => {
                const currentUser = socket.currentUser;

                console.log(`User connected to ${MESSAGE_CHANNEL.NAMESPACE}: ${currentUser.username}`);
                socket.join(MESSAGE_CHANNEL.EVENTS.NEW_MESSAGE + '-' + currentUser.userId);
                socket.on('disconnect', () => {
                    console.log(`User disconnected from ${namespace}: ${socket.currentUser.username}`);
                    socket.leave(MESSAGE_CHANNEL.EVENTS.NEW_MESSAGE + '-' + currentUser.userId);
                });
            });
        }
    });
};

module.exports = messageSocketBuilder;
