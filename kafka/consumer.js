const kafka = require('kafka-node');

const kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_CLIENT_HOST });

const activeServiceConsumer = ({
    topic,
    serviceInstance
}) => {
    const serviceConsumer = new kafka.Consumer(kafkaClient, [{ topic }], { autoCommit: true });

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

const createTopicIfNotExists = ({ topic, client, partitions, replicationFactor }) => {
    return new Promise((resolve, reject) => {
        client.createTopics([{
            topic: topic,
            partitions: partitions || 1,
            replicationFactor: replicationFactor || 1
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
    createTopicIfNotExists,
};