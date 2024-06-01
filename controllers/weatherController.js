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

async function createForecasts(req, res) {
  const newData = await weatherService.updateForecasts();
  res.status(201).json(newData);
}

async function getWeatherStation(req, res) {
  console.log('getWeatherStation');
  const id = req.query.id;
  const station = await weatherService.getWeatherStationById(id);
  res.status(200).json(station);
}

module.exports = {
  getWeatherStations,
  createWeatherStation,
  createForecasts,
  getWeatherStation
};
