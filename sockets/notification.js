const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');
const authSocketMiddleware = require('../middlewares/authSocketMiddleware');
const { mappingSocketBuilder } = require('.');

const notificationSocketBuilder = (io) => {
    mappingSocketBuilder({
        io,
        middlewares: [authSocketMiddleware],
        namespace: NOTIFICATION_CHANNEL.NAMESPACE,
        builder: (namespace) => {
            namespace.on('connection', socket => {
                const currentUser = socket.currentUser;

                console.log(`User connected to ${NOTIFICATION_CHANNEL.NAMESPACE}: ${currentUser.username}`);
                socket.join(NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION + currentUser.userId);

                socket.on('disconnect', () => {
                    console.log(`User disconnected from ${NOTIFICATION_CHANNEL.NAMESPACE}: ${socket.currentUser.username}`);
                    socket.leave(NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION + currentUser.userId);
                });
            });
        }
    });
}

module.exports = notificationSocketBuilder;