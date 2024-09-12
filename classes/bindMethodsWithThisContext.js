const bindMethodsWithThisContext = (instance) => {
    const prototype = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(prototype).forEach((key) => {
        if (typeof instance[key] === 'function' && key !== 'constructor') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

module.exports = bindMethodsWithThisContext;