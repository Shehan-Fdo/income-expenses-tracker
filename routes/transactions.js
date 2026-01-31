const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get transaction summary
router.get('/summary', async (req, res) => {
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
});

// Add a new transaction
router.post('/', async (req, res) => {
  const { type, amount, description, category } = req.body;

  if (!type || !amount) {
    return res.status(400).json({ error: 'Type and amount are required' });
  }

  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Type must be "income" or "expense"' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO transactions (type, amount, description, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, amount, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
