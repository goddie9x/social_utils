const { Kafka } = require('kafkajs');

const kafkaClient = new Kafka({
    clientId: process.env.APP_NAME,
    brokers: [process.env.KAFKA_CLIENT_HOST],
});

const activeServiceConsumer = async ({
    topic,
    serviceInstance
}) => {
    try {
        const serviceConsumer = kafkaClient.consumer({ groupId: process.env.APP_NAME, autoCommit: true })
        await serviceConsumer.connect();
        await serviceConsumer.subscribe({ topic, fromBeginning: false });
        await serviceConsumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const { action, ...data } = JSON.parse(message.value);
                    if (typeof serviceInstance[action] === 'function') {
                        response = await serviceInstance[action](data);
                    }
                } catch (error) {
                    console.error('Error processing Kafka message:', error);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}
const activeMultipleServiceConsumer = async ({
    topic,
    serviceInstances
}) => {
    try {
        const amountService = serviceInstances.length;
        const serviceConsumer = kafkaClient.consumer({ groupId: process.env.APP_NAME, autoCommit: true })
        await serviceConsumer.connect();
        await serviceConsumer.subscribe({ topic, fromBeginning: false });
        await serviceConsumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const { action, ...data } = JSON.parse(message.value);
                    for (let i = 0; i < amountService; i++) {
                        if (typeof serviceInstances[i][action] === 'function') {
                            return await serviceInstances[i][action](data);
                        }
                    }
                } catch (error) {
                    console.error('Error processing Kafka message:', error);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}
const createTopicIfNotExists = async (topics) => {
    try {
        const admin = kafkaClient.admin();
        await admin.createTopics({
            topics
        });
    } catch (error) {
        console.log('create topic error');
        console.log('list topics:', topics);
        console.log(error);
    }
};
module.exports = {
    activeServiceConsumer,
    createTopicIfNotExists,
    activeMultipleServiceConsumer,
};