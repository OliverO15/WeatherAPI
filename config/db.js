// config/db.js
const { createClient } = require('drizzle-orm');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = createClient(pool);

module.exports = db;
