const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');
const authSocketMiddleware = require('../middlewares/authSocketMiddleware');
const {mappingSocketBuilder}= require('./');
const notificationSocketBuilder = (io) => {
    mappingSocketBuilder({
        io,
        middlewares:[authSocketMiddleware],
        namespace:NOTIFICATION_CHANNEL.NAMESPACE,
        builder:(namespace)=>{
            namespace.on('connection', (socket) => {
                const currentUser = socket.currentUser;
        
                console.log(`User connected to ${namespace}: ${currentUser.username}`);
                socket.join('new-notification-' + currentUser.userId);
                socket.on('disconnect', () => {
                    console.log(`User disconnected from ${namespace}: ${socket.currentUser.username}`);
                    socket.leave(channelPrefix + '-' + currentUser.userId);
                });
            });
        }
    });
};

module.exports = notificationSocketBuilder;
