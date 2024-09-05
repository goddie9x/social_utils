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
    static bindMethods(instance) {
        const prototype = Object.getPrototypeOf(instance);
        Object.getOwnPropertyNames(prototype).forEach((key) => {
            if (typeof instance[key] === 'function' && key !== 'constructor') {
                instance[key] = instance[key].bind(instance);
            }
        });
    }
}

module.exports = BasicService;