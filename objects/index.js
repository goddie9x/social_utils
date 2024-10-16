const updateObjectIfUpdateFieldDataDefined = (object, updates) => {
    Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
            object[key] = updates[key];
        }
    });
};

module.exports = { updateObjectIfUpdateFieldDataDefined };