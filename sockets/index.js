const mappingSocketBuilder = ({ io, builder, namespace, middlewares }) => {
    const ns = io.of(namespace);
    middlewares?.forEach(middleware => {
        ns.use(middleware)
    });
    builder(ns);
}
const socketJoinEventsConventions = ({ socket, listEvent, userId }) => {
    listEvent.forEach(event => {
        socket.join(event + userId);
    });
}
const socketLeaveEventsConventions = ({ socket, listEvent, userId })=>{
    listEvent.forEach(event => {
        socket.leave(event + userId);
    });
}

module.exports = {
    mappingSocketBuilder,
    socketJoinEventsConventions,
    socketLeaveEventsConventions,
}