const KAFKA_TOPICS = {
    USER_TOPIC: {
        REQUEST: 'user-request',
    },
    NOTIFICATION_TOPIC: {
        REQUEST: 'notification-request',
        RESPONSE: 'notification-response',
    },
    MESSAGE_TOPIC: {
        REQUEST: 'message-request',
        RESPONSE: 'message-response',
    },
    SOCKET_GATEWAY_TOPIC: {
        REQUEST: 'socket-gateway-request',
        RESPONSE: 'socket-gateway-response',
    },
};

module.exports = { KAFKA_TOPICS };