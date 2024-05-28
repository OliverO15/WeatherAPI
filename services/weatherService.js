// Examples

// services/weatherService.js
const { WeatherStation, WeatherData } = require('../models/weatherModel');

async function getAllWeatherStations() {
  return await WeatherStation.select();
}

async function addWeatherStation(station) {
  return await WeatherStation.insert(station);
}

async function addWeatherData(data) {
  return await WeatherData.insert(data);
}

module.exports = {
  getAllWeatherStations,
  addWeatherStation,
  addWeatherData,
};
