// Examples

// routes/weatherRoutes.js
const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/stations', weatherController.getWeatherStations);
router.post('/stations', weatherController.createWeatherStation);
router.post('/data', weatherController.createWeatherData);

module.exports = router;
