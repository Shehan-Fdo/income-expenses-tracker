const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Routes
app.use('/api/transactions', require('./routes/transactions'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize database on startup
const initDB = async () => {
  const fs = require('fs');
  const pool = require('./db/db');

  try {
    const sql = fs.readFileSync('./db/init.sql', 'utf8');
    await pool.query(sql);
    console.log('✅ Database initialized successfully');
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
};

// Start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api/transactions`);
    console.log(`📈 Summary endpoint: http://localhost:${PORT}/api/transactions/summary\n`);
  });
});
