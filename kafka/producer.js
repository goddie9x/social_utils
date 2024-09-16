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
    const messageJson = JSON.stringify(messages);

    const payloads = [
        { topic, messages: messageJson }
    ];
    try {
        await kafkaProducer.send(payloads)
    } catch (error) {
        console.log('Send kafka message error', error);
    }
};

const sendNewSocketMessageToSocketGateway = ({ namespace, roomId, receiverId, event, message }) => {
    const messages = {
        action: 'handleRedisSocketMessage',
        namespace, roomId, receiverId, event, message
    }
    sendKafkaMessage({
        topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST,
        messages
    });
}
const sendCreateNotificationKafkaMessage = ({
    target, type, content, href
}) => {
    const messages = {
        action: 'createNotification',
        target: NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION + '-' + target,
        type, content, href
    };

    sendKafkaMessage({
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST,
        messages
    });
}


module.exports = {
    sendKafkaMessage,
    sendCreateNotificationKafkaMessage,
    sendNewSocketMessageToSocketGateway,
    kafkaClient,
};