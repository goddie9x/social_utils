const { Client } = require('@elastic/elasticsearch');

const elasticSearchClient = new Client({
    node: process.env.ELASTIC_SEARCH_INSTANCE,
    auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD,
    }
});

async function testConnection() {
    try {
        const response = await elasticSearchClient.info();
        console.log('Elasticsearch is connected:', response);
    } catch (error) {
        console.error('Error connecting to Elasticsearch:', error);
    }
}

testConnection();

module.exports = elasticSearchClient;