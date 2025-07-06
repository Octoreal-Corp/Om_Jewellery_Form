import { authenticateToken, requireRole } from '../middleware/auth.js';

router.put('/users/:id/role', authenticateToken, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
  res.json({ success: true, message: 'Role updated' });
});
