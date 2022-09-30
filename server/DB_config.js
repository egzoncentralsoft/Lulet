const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: 'postgres',
    database: 'flower_db',
    host: 'localhost',
    port: '5432',
    password: 'Djellza88'
})
/*
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig: devConfig
});
/*
//djellza

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
    PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
     //ssl: process.env.DATABASE_URL ? true : false,
    ...(process.env.NODE_ENV === 'production' && { 
        ssl: { 
            require: true,
            rejectUnauthorized: false
        }
    })
})
*/
//djel
module.exports = { pool };