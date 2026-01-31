const pool = require('../../db/db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Get all transactions
      const result = await pool.query(
        'SELECT * FROM transactions ORDER BY created_at DESC'
      );
      res.json(result.rows);
    } else if (req.method === 'POST') {
      // Add a new transaction
      const { type, amount, description, category } = req.body;

      if (!type || !amount) {
        return res.status(400).json({ error: 'Type and amount are required' });
      }

      if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: 'Type must be "income" or "expense"' });
      }

      const result = await pool.query(
        'INSERT INTO transactions (type, amount, description, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [type, amount, description, category]
      );
      res.status(201).json(result.rows[0]);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
