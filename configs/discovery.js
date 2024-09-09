const { Eureka } = require('eureka-js-client');

const connectToDiscoveryServer = () => {
    const port = process.env.PORT || 3000;

    const client = new Eureka({
        instance: {
            instanceId:`${process.env.IP_ADDRESS}:${process.env.APP_NAME}:${port}`,
            app: process.env.APP_NAME,
            hostName: process.env.HOST_NAME,
            ipAddr: process.env.IP_ADDRESS,
            statusPageUrl: `http://localhost:${port}${process.env.APP_PATH}/status`,
            healthCheckUrl: `http://localhost:${port}${process.env.APP_PATH}/health`,
            port: {
                '$': port,
                '@enabled': true,
            },
            vipAddress: process.env.APP_NAME,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: process.env.EUREKA_DISCOVERY_SERVER_HOST || 'discovery-server',
            port: process.env.EUREKA_DISCOVERY_SERVER_PORT || 8761,
        },
    });

    client.start(error => {
        if (error) {
            console.log('Error starting Eureka client:', error);
        } else {
            console.log('Eureka client started');
        }
    });
    return client;
}

module.exports = connectToDiscoveryServer;