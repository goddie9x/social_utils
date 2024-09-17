const CHANNELS = {
    MESSAGE_CHANNEL:{
        NAMESPACE:'message',
        EVENTS:{
            NEW_MESSAGE:'new-message'
        }
    },
    NOTIFICATION_CHANNEL:{
        NAMESPACE:'notification',
        EVENTS:{
            NEW_NOTIFICATION:'new-notification'
        }
    },
};

module.exports = CHANNELS;