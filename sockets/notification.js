const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');

const notificationSocketBuilder = (io) => {
    const namespace = io.of(NOTIFICATION_CHANNEL.NAMESPACE);

    namespace.on('connection', (socket) => {
        const currentUser = socket.currentUser;

        console.log(`User connected to ${namespace}: ${currentUser.username}`);
        socket.join('new-notification-' + currentUser.userId);
        socket.on('disconnect', () => {
            console.log(`User disconnected from ${namespace}: ${socket.currentUser.username}`);
            socket.leave(channelPrefix + '-' + currentUser.userId);
        });
    });
};

module.exports = notificationSocketBuilder;
