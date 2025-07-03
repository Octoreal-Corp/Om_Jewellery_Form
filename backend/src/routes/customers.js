import express from 'express';
import pool from '../db/db.js';

const router = express.Router();


router.get('/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE gender = 'Male') AS male,
        COUNT(*) FILTER (WHERE gender = 'Female') AS female,
        COUNT(*) FILTER (WHERE status = 'Married') AS married,
        COUNT(*) FILTER (WHERE status = 'Single') AS single
      FROM customers;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching customer summary:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
