class BasicService {
    async getPaginatedResults({ model, query, page, limit }) {
        const skip = (page - 1) * limit;
        const getResultsPromise = model.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
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