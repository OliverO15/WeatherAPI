// schema.js
const { pgTable, pgEnum, serial, text, integer, date, time, doublePrecision, unique } = require('drizzle-orm/pg-core');

// Define the enum type for leisure types
const leisureTypesEnum = pgEnum('type', ['golf course', 'camping', 'swimming pool']);

// Define the Leisure table
const Leisure = pgTable('leisures', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  link: text('link').notNull(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  type: leisureTypesEnum('type').notNull(),
  placeId: integer('place_id').references(() => Place.id), // Foreign key to Place
});

// Define the Place table
const Place = pgTable('places', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  link: text('link').notNull(),
});

// Define the Weather Station table
const WeatherStation = pgTable('weather_stations', {
  station_id: text('station_id').primaryKey(),
  name: text('name').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  // A Weather Station is connected to one Place
  placeId: integer('place_id').references(() => Place.id), // Foreign key to Place
});

// Define the Forecast table
const Forecast = pgTable('forecasts', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  time: time('time').notNull(),
  temperature: integer('temperature').notNull(),
  wind: integer('wind').notNull(),
  windDirection: text('wind_direction').notNull(),
  perception: text('perception').notNull(),
  // Each Forecast is connected to one Weather Station
  weatherStationId: text('weather_station_id').notNull().references(() => WeatherStation.station_id), // Foreign key to Weather Station
}, (f) => ({
  unq: unique('unique_forecast').on(f.date, f.weatherStationId)
}));

module.exports = {
  leisureTypesEnum,
  Leisure,
  Place,
  WeatherStation,
  Forecast
};