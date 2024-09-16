const mappingSocketBuilder=({io,builder,namespace,middlewares})=>{
    const ns = io.of(namespace);
    middlewares?.forEach(middleware=>{
        ns.use(middleware)
    });
    builder(ns);
}

module.exports = {
    mappingSocketBuilder
}