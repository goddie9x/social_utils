const { MESSAGE_CHANNEL, COMMON } = require('../constants/socketChannel');
const authSocketMiddleware = require('../middlewares/authSocketMiddleware');
const { mappingSocketBuilder, socketJoinEventsConventions, socketLeaveEventsConventions } = require('.');
const messageSocketBuilder = (io) => {
    mappingSocketBuilder({
        io,
        middlewares: [authSocketMiddleware],
        namespace: MESSAGE_CHANNEL.NAMESPACE,
        builder: (namespace) => {
            namespace.on('connection', (socket) => {
                const currentUser = socket.currentUser;
                const listEvent = Object.values(MESSAGE_CHANNEL.EVENTS);

                console.log(`User connected to ${MESSAGE_CHANNEL.NAMESPACE}: ${currentUser.username}`);
                socketJoinEventsConventions({
                    listEvent,
                    socket,
                    userId: currentUser.userId
                });
                namespace.on(COMMON.EVENTS.JOIN_ROOM, ({ roomId }) => {
                    socket.join(roomId);
                });
                namespace.on(COMMON.EVENTS.LEAVE_ROOM, ({ roomId }) => {
                    socket.leave(roomId);
                });
                socket.on('disconnect', () => {
                    console.log(`User disconnected from ${namespace}: ${socket.currentUser.username}`);
                    socketLeaveEventsConventions({
                        listEvent,
                        socket,
                        userId: currentUser.userId
                    });
                });
            });
        }
    });
};

module.exports = messageSocketBuilder;
