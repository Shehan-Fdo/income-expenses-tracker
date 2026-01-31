const pool = require('../../db/db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const incomeResult = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = $1',
      ['income']
    );
    const expenseResult = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = $1',
      ['expense']
    );

    const income = parseFloat(incomeResult.rows[0].total);
    const expense = parseFloat(expenseResult.rows[0].total);
    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
