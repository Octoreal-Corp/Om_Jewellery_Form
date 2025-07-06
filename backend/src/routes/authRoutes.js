import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';
import { authenticateToken, requireRole } from '../middlewares/auth.js'; 


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, phone, hashed]
  );

  const user = result.rows[0];
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ user, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, role: user.role }, token });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; 
    const result = await pool.query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [userId]
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name, 
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error in /auth/me:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users', async (req, res) => {
    
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role FROM users' 
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_records: result.rows.length,
        limit: 10,
        has_next: false,
      },
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put("/users/:id/role", authenticateToken, requireRole("manager"), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, phone, role",
      [role, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/users/:id", authenticateToken, requireRole("manager"), async (req, res) => {
  const { id } = req.params;
  if (req.user.userId === parseInt(id)) {
    return res.status(403).json({ error: "You cannot delete your own account" });
  }

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;