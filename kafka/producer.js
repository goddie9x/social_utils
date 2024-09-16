const { KAFKA_TOPICS } = require('../constants/kafka');
const { NOTIFICATION_CHANNEL } = require('../constants/socketChannel');
const { Kafka, Partitioners } = require('kafkajs');

class KafkaProducer {
    static instance;
    producer;
    isConnected = false;
    constructor() {
        const kafkaClient = new Kafka({
            clientId: process.env.APP_NAME,
            brokers: [process.env.KAFKA_CLIENT_HOST],
        });
        this._producer = kafkaClient.producer();
    }
    static async getInstance() {
        try {
            if (!KafkaProducer.instance) {
                KafkaProducer.instance = new KafkaProducer();
            }
            if (!KafkaProducer.instance.isConnected) {
                await KafkaProducer.instance.producer.connect({
                    allowAutoTopicCreation: false,
                    createPartitioner: Partitioners.DefaultPartitioner
                });
                KafkaProducer.instance.isConnected = true;
            }
            return KafkaProducer.instance;
        } catch (error) {
            KafkaProducer.instance.isConnected = false;
            console.log(error);
        }
    }
}

const sendKafkaMessage = async ({ topic, messages }) => {
    try {
        this.kafkaClient = await KafkaProducer.getInstance();
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