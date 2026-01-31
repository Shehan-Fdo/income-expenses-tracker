const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  const fs = require('fs');
  try {
    const sql = fs.readFileSync('./db/init.sql', 'utf8');
    console.log('Initializing database...');
    await pool.query(sql);
    console.log('✅ Database initialized successfully');
    await pool.end();
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
    process.exit(1);
  }
}

initDB();
