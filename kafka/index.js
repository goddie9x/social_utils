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
module.exports = {
    activeServiceConsumer,
    sendKafkaMessage
};