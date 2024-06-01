// Examples

// routes/weatherRoutes.js
const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/stations', weatherController.getWeatherStations);
router.get('/station', weatherController.getWeatherStation);
router.post('/stations', weatherController.createWeatherStation);
router.post('/data', weatherController.createForecasts);

module.exports = router;
