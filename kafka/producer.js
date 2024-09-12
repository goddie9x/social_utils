const kafka = require('kafka-node');
const { KAFKA_TOPICS } = require('../constants/kafka');

const kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_CLIENT_HOST });
const kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});
kafkaProducer.on('error', (err) => {
    console.error('Kafka Producer error:', err);
});
const sendKafkaMessage = ({ topic, messages }) => {
    const messageJson = JSON.stringify(messages);

    return new Promise((resolve, reject) => {
        const payloads = [
            { topic, messages: messageJson }
        ];

        kafkaProducer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message:', err);
                reject(err);
            } else {
                console.log('Message sent successfully:', data);
                resolve(data);
            }
        });
    });
};

const sendNewSocketMessageToSocketGateway = ({ channel, roomId, receiverId, event, message }) => {
    const messages = {
        action: 'handleRedisSocketMessage',
        channel, roomId, receiverId, event, message
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
        target, type, content, href
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