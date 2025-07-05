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
        COUNT(*) FILTER (WHERE marital_status = 'Married') AS married,
        COUNT(*) FILTER (WHERE marital_status = 'Single') AS single
      FROM customers;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching customer summary:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      'SELECT * FROM customers ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countRes = await pool.query('SELECT COUNT(*) FROM customers');
    const total = parseInt(countRes.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    res.json({
      data: result.rows,
      total,
      page,
      totalPages
    });
  } catch (err) {
    console.error('Error fetching paginated customers:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});



router.post('/', async (req, res) => {
  const {
    marital_status,
    name,
    phone,
    whatsapp,
    dob,
    occupation,
    community,
    samaj,
    address,
    pincode,
    gender,
    email  
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO customers (
        marital_status,
        name,
        phone,
        whatsapp,
        dob,
        occupation,
        community,
        samaj,
        address,
        pincode,
        gender,
        email  
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        marital_status,
        name,
        phone,
        whatsapp,
        dob,
        occupation,
        community,
        samaj,
        address,
        pincode,
        gender || 'Not specified',
        email  
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).json({ error: 'Failed to add customer' });
  }
});


export default router;
