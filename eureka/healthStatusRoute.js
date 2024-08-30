const healthStatusController = require('./healthStatusController');

const mapHealthStatusRoute = (router) => {
    router.get('/status', healthStatusController.status);
    router.get('/health', healthStatusController.health);
}

module.exports = mapHealthStatusRoute;