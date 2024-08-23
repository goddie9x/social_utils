const CLIENT_ROUTES = {
    GEN_ROUTE_BY_ID: (path, id) => path + id,
    GEN_FRIEND_REQUEST_LIST_ROUTE: (id) => GEN_ROUTE_BY_ID('/friends/request/', id),
    GEN_USER_PROFILE_ROUTE:(id)=>GEN_ROUTE_BY_ID('/users/profile/',id),
}