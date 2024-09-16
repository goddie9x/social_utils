const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');
const authSocketMiddleware = require('../middlewares/authSocketMiddleware');
const {mappingSocketBuilder} = require('./');

const messageSocketBuilder = (io) => {
    mappingSocketBuilder({
        io,
        middlewares:[authSocketMiddleware],
        namespace:NOTIFICATION_CHANNEL.NAMESPACE,
        builder:(namespace)=>{
            namespace.on('connection', socket => {
                const currentUser = socket.currentUser;
        
                console.log(`User connected to ${namespace}: ${currentUser.username}`);
                socket.join('new-message-' + currentUser.userId);
        
                socket.on('disconnect', () => {
                    console.log(`User disconnected from ${namespace}: ${socket.currentUser.username}`);
                    socket.leave('new-message-' + currentUser.userId);
                });
            });
        }
    });
}

module.exports = messageSocketBuilder;