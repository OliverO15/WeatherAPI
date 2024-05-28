// Examples

// controllers/weatherController.js
const weatherService = require('../services/weatherService');

async function getWeatherStations(req, res) {
  const stations = await weatherService.getAllWeatherStations();
  res.json(stations);
}

async function createWeatherStation(req, res) {
  const station = req.body;
  const newStation = await weatherService.addWeatherStation(station);
  res.status(201).json(newStation);
}

async function createWeatherData(req, res) {
  const data = req.body;
  const newData = await weatherService.addWeatherData(data);
  res.status(201).json(newData);
}

module.exports = {
  getWeatherStations,
  createWeatherStation,
  createWeatherData,
};
