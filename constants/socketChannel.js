const CHANNELS = {
    MESSAGE_CHANNEL:{
        NAMESPACE:'message',
        PREFIX:'/messages',
    },
    NOTIFICATION_CHANNEL:{
        NAMESPACE:'notification',
        PREFIX:'/notifications',
        EVENTS:{
            NEW_NOTIFICATION:'new-notification'
        }
    },
};

module.exports = CHANNELS;