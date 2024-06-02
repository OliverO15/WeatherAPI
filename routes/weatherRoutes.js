// Examples

// routes/weatherRoutes.js
const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/station', weatherController.getWeatherStation);
router.get('/forecasts', weatherController.getForecasts);
router.get('/place', weatherController.getPlace);
router.post('/data', weatherController.createForecasts);

module.exports = router;
