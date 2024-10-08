const CHANNELS = {
    COMMON: {
        EVENTS: {
            JOIN_ROOM: 'join-room',
            LEAVE_ROOM: 'leave-room',
        },
    },
    MESSAGE_CHANNEL: {
        NAMESPACE: 'message',
        EVENTS: {
            NEW_MESSAGE: 'new-message',
            HIDE_MESSAGE: 'hide-message',
            CONTACT_CREATED: 'contact-created',
            GROUP_CHAT_CREATED: 'group-chat-created',
            UPDATE_CONTACT_INFO: 'update-contact-information',
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