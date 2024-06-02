const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const { Forecast, WeatherStation, Place, Leisure } = require('../models/schema');
const { eq, lt } = require('drizzle-orm');

async function fetchWeatherData() {
  try {
    const weatherStations = fs.readFileSync(path.join(__dirname, '../assets/stations.txt'), 'utf-8');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://xmlweather.vedur.is/?op_w=xml&type=forec&lang=is&view=xml&ids=${weatherStations}`,
      headers: {}
    };

    const response = await axios.request(config);
    const data = await parseStringPromise(response.data);
    return data.forecasts.station;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

async function updateForecasts() {
  const stations = await fetchWeatherData();
  const updatedForecasts = [];

  for (const station of stations) {
    const stationId = station.$.id;
    const forecasts = station.forecast;

    for (const forecast of forecasts) {
      const [date, time] = forecast.ftime[0].split(' ');

      if (time === '12:00:00') {
        const forecastData = {
          date: new Date(date),
          time: time,
          temperature: parseInt(forecast.T[0], 10),  // Extract temperature from array
          wind: parseInt(forecast.F[0], 10),  // Extract wind from array
          windDirection: forecast.D[0],  // Extract wind direction from array
          perception: forecast.W[0],  // Extract perception from array
          weatherStationId: stationId
        };

        updatedForecasts.push(forecastData);

        await db.insert(Forecast).values(forecastData).onConflictDoUpdate({
          target: [Forecast.date, Forecast.weatherStationId],
          set: {
            temperature: forecastData.temperature,
            wind: forecastData.wind,
            windDirection: forecastData.windDirection,
            perception: forecastData.perception
          }
        });
      }
    }
  }

  return updatedForecasts;
}

async function removeOldForecasts() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);  // Set the time to midnight UTC

  const res = await db.delete(Forecast).where(lt(Forecast.date, today));
  return res;
}

async function getWeatherStationById(id) {
  try {
    console.log('Station ID:', id);
    const result = await db.select().from(WeatherStation).where(eq(WeatherStation.station_id, id));
    console.log('Station:', result);
    return result;
  } catch (error) {
    console.error(`Error fetching weather station with ID ${id}:`, error);
    throw error;
  }
}

async function getForecasts(date) {
  try {
    // Create a new Date object from the input date
    const dateObj = new Date(date);

    // Set the time to midnight UTC
    dateObj.setUTCHours(0, 0, 0, 0);

    // Convert the Date object to an ISO string
    const isoDate = dateObj.toISOString();

    const result = await db.select().from(Forecast).where(eq(Forecast.date, isoDate));
    return result;
  } catch (error) {
    console.error(`Error fetching forecasts for date ${date}:`, error);
    return null;
  }
}

async function getPlaceByStationId(stationId, withLeisure = false) {
  try {
    const weatherStation = await getWeatherStationById(stationId);

    if (weatherStation.length === 0) {
      return null;
    }

    const placeId = weatherStation[0].placeId;

    const result = await db.select().from(Place).where(eq(Place.id, placeId));

    if (result.length === 0) {
      return null;
    }

    const place = result[0];

    if (withLeisure) {
      const leisures = await db.select().from(Leisure).where(eq(Leisure.placeId, placeId));
      place.leisures = leisures;
    }

    return place;
  } catch (error) {
    console.error(`Error fetching place for weather station with ID ${stationId}:`, error);
    return null;
  }
}

module.exports = {
  updateForecasts,
  removeOldForecasts,
  getWeatherStationById,
  getForecasts,
  getPlaceByStationId
};
