const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'flower_db',
    host: 'localhost',
    port: '5432',
    password: 'Djellza88'
})

module.exports = { pool };