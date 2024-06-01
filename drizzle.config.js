import { defineConfig } from 'drizzle-kit';
require('dotenv').config();

export default defineConfig({
    schema: './models/schema.js',
    out: './db',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: true,
    },
});