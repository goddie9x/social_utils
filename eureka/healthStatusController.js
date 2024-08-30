class HealthStatusController {
    health(req, res) {
        res.status(200).send('OK');
    }
    status(req, res) {
        res.json({
            status: 'running',
            uptime: process.uptime(),
        });
    }
}

module.exports = new HealthStatusController();