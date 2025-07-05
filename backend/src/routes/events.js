import express from 'express';
import pool from '../db/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});


router.post('/', upload.single('photo'), async (req, res) => {
  const { name, date, message, repeat } = req.body;
  const attachment = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      `INSERT INTO events (name, date, message, attachment, repeat)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, date, message, attachment, repeat]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

export default router;
