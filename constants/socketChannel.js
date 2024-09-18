const CHANNELS = {
    MESSAGE_CHANNEL: {
        NAMESPACE: 'message',
        EVENTS: {
            NEW_MESSAGE: 'new-message',
            HIDE_MESSAGE: 'hide-message',
            UPDATE_GROUP_CHAT_INFO: 'update-group-chat-information',
        },
    },
    NOTIFICATION_CHANNEL: {
        NAMESPACE: 'notification',
        EVENTS: {
            NEW_NOTIFICATION: 'new-notification',
        },
    },
};

module.exports = CHANNELS;