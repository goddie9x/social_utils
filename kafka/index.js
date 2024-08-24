const { KAFKA_TOPICS } = require('../constants/kafka');

const activeServiceConsumer = ({
    kafkaClient,
    topic,
    serviceInstance
}) => {
    const serviceConsumer = new Consumer(kafkaClient, [{ topic }], { autoCommit: true });

    serviceConsumer.on('message', async (messages) => {
        try {
            const { action, ...data } = JSON.parse(messages.value);

            if (typeof serviceInstance[action] === 'function') {
                response = await serviceInstance[action](data);
            }
        } catch (error) {
            console.error('Error processing Kafka message:', error);
        }
    });

    serviceConsumer.on('error', (err) => {
        console.error('Kafka Consumer error:', err);
    });
}
const sendKafkaMessage = ({ topic, message, kafkaProducer }) => {
    const messageJson = JSON.stringify(message);

    return new Promise((resolve, reject) => {
        const payloads = [
            { topic: topic, message: messageJson }
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

const sendCreateNotificationKafkaMessage = (kafkaProducer, {
    target, type, content, href
}) => {
    const message = {
        action: 'createNotification',
        target, type, content, href
    };

    sendKafkaMessage({
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST,
        kafkaProducer,
        message
    })
}
const createTopicIfNotExists = (topic) => {
    return new Promise((resolve, reject) => {
        client.createTopics([{
            topic: topic,
            partitions: 1,
            replicationFactor: 1
        }], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
module.exports = {
    activeServiceConsumer,
    sendKafkaMessage,
    sendCreateNotificationKafkaMessage,
    createTopicIfNotExists
};