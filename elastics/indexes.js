const createElasticSearchIndex = async ({ indexName, elasticSearchClient,properties}) => {
    const exists = await elasticSearchClient.indices.exists({index:indexName});
    if(!exists){
        await elasticSearchClient.indices.create({
            index: indexName,
            body:{
                mappings:{
                    properties
                }
            }
        })
    }
}

module.exports = createElasticSearchIndex;