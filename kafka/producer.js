const { KAFKA_TOPICS } = require('../constants/kafka');
const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');
const { Kafka, Partitioners } = require('kafkajs');

const kafkaClient = new Kafka({
    clientId: process.env.APP_NAME,
    brokers: [process.env.KAFKA_CLIENT_HOST],
});
const kafkaProducer = kafkaClient.producer({
    allowAutoTopicCreation: false,
    createPartitioner: Partitioners.DefaultPartitioner
});

const sendKafkaMessage = async ({ topic, messages }) => {
    try {
        await kafkaProducer.send({ topic, messages });
    } catch (error) {
        console.log('Send kafka message error topic:' + topic, error);
    }
};

const sendNewMessageToSocketGateway = async ({ namespace, roomId, event, message }) => {
    const messages = [{
        key: 'handleRedisSocketMessage',
        value: JSON.stringify({
            action: 'handleRedisSocketMessage',
            namespace, roomId, event, message
        })
    }];
    await sendKafkaMessage({
        topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST,
        messages
    });
}
const sendMultipleNewMessagesToSocketGateway = async ({ namespace, event, messages }) => {
    const listKafkaMessage = messages.map(message => ({
        key: 'handleRedisSocketMessage',
        value: JSON.stringify({
            action: 'handleRedisSocketMessage',
            namespace, roomId: message.roomId, event, message
        })
    }));
    await sendKafkaMessage({
        topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST,
        messages: listKafkaMessage
    });
}
const sendCreateNotificationKafkaMessage = async ({
    target, type, content, href
}) => {
    const messages = [{
        key: 'createNotification',
        value: JSON.stringify({
            action: 'createNotification',
            target: NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION + '-' + target,
            type, content, href
        })
    }];

    await sendKafkaMessage({
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST,
        messages
    });
}

module.exports = {
    sendKafkaMessage,
    sendCreateNotificationKafkaMessage,
    sendMultipleNewMessagesToSocketGateway,
    sendNewMessageToSocketGateway,
    kafkaClient,
};