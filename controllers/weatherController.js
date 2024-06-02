// Examples

// controllers/weatherController.js
const weatherService = require('../services/weatherService');

async function createForecasts(req, res) {
  const newData = await weatherService.updateForecasts();
  console.log('Updated Forecasts Successfully');
  res.status(201).json(newData);
}

async function getWeatherStation(req, res) {
  console.log('getWeatherStation');
  const id = req.query.id;
  const station = await weatherService.getWeatherStationById(id);
  res.status(200).json(station);
}

async function getForecasts(req, res) {
  const date = new Date(req.query.date);
  
  if (isNaN(date.getTime())) {
    res.status(400).json({ error: 'Invalid date' });
    return;
  }

  const forecasts = await weatherService.getForecasts(date);
  if (!forecasts) {
    res.status(404).json({ error: 'No forecasts found' });
    return;
  }

  return res.status(200).json(forecasts);
}

async function getPlace(req, res) {
  const weatherStationId = req.query.weatherStationId;
  const withLeisure = req.query.withLeisure;

  if (!weatherStationId) {
    res.status(400).json({ error: 'Missing weatherStationId' });
    return;
  }

  const place = await weatherService.getPlaceByStationId(weatherStationId, withLeisure === 'true');

  if (!place) {
    res.status(404).json({ error: 'Place not found' });
    return;
  }

  return res.status(200).json(place);
}

module.exports = {
  createForecasts,
  getWeatherStation,
  getForecasts,
  getPlace
};
