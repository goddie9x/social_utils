const { KAFKA_TOPICS } = require('../constants/kafka');
const { Kafka, Partitioners } = require('kafkajs');

const kafkaClient = new Kafka({
    clientId: process.env.APP_NAME,
    brokers: [process.env.KAFKA_CLIENT_HOST],
});
class KafkaProducer {
    static producer = kafkaClient.producer();
    static isConnected = false;
    
    static async getInstance() {
        try {
            if (!KafkaProducer.producer) {
                KafkaProducer.producer = new KafkaProducer();
            }
            if (!KafkaProducer.isConnected) {
                await KafkaProducer.producer.connect({
                    allowAutoTopicCreation: false,
                    createPartitioner: Partitioners.DefaultPartitioner
                });
                KafkaProducer.isConnected = true;
            }
            return KafkaProducer.producer;
        } catch (error) {
            KafkaProducer.isConnected = false;
            console.log(error);
            return null;
        }
    }
}

const sendKafkaMessage = async ({ topic, messages }) => {
    try {
        const kafkaProducer = await KafkaProducer.getInstance();
        await kafkaProducer.send({ topic, messages });
    } catch (error) {
        console.log('Send kafka message error topic:' + topic, error);
    }
};

const sendNewMessageToSocketGateway = async ({ namespace, roomId, event, message }) => {
    const messages = [{
        key: 'handleSocketMessage',
        value: JSON.stringify({
            action: 'handleSocketMessage',
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
        key: 'handleSocketMessage',
        value: JSON.stringify({
            action: 'handleSocketMessage',
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
            target: target,
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