const { Eureka } = require('eureka-js-client');

const connectToDiscoveryServer = () => {
    const port = process.env.PORT || 3000;

    const client = new Eureka({
        instance: {
            app: process.env.APP_NAME,
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            statusPageUrl: 'http://localhost:' + port + '/info',
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
            host: process.env.EUREKA_DISCOVERY_SERVER_HOST || 'localhost',
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
}

module.exports = connectToDiscoveryServer;