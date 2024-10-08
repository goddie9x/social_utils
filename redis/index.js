const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
    if (!redisClient) {
        redisClient = createClient({
            url: process.env.REDIS_CONNECTION_STRING
        });

        redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });

        redisClient.on('error', err => {
            console.log('Redis Client Error', err);
        });

        await redisClient.connect(); // Connect only once
    }
    return redisClient;
};
module.exports = connectRedis


