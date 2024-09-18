class BasicService {
    async getPaginatedResults({ model, query, page = 1, limit = 10, sort = {
        createdAt: -1
    } }) {
        const skip = (page - 1) * limit;
        const getResultsPromise = model.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .sort(sort);
        const getTotalDocumentsPromise = model.countDocuments(query);
        const [results, totalDocuments] = await Promise.all([getResultsPromise, getTotalDocumentsPromise]);

        return {
            results,
            totalDocuments,
            totalPages: Math.ceil(totalDocuments / limit)
        };
    }
}

module.exports = BasicService;