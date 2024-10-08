const CLIENT_ROUTES = {
    GEN_ROUTE_BY_ID: (path, id) => path + id,
    GEN_FRIEND_REQUEST_LIST_ROUTE: (id) => CLIENT_ROUTES.GEN_ROUTE_BY_ID('/friends/request/', id),
    GEN_USER_PROFILE_ROUTE:(id)=>CLIENT_ROUTES.GEN_ROUTE_BY_ID('/users/profile/',id),
}

module.exports = CLIENT_ROUTES;