import express from "express";
import {
  createCoupleUser,
  createSingleUser,
  getCoupleUserById,
  getCoupleUsers,
  getSingleUserById,
  getSingleUsers,
  updateCoupleUser,
  updateSingleUser,
  deleteCoupleUser,
  deleteSingleUser,
} from "../controllers/user.controller.js";
import { createUser, getFilteredUsers } from "../models/user.models.js";
import pool from "../db/db.js";
import dayjs from "dayjs";

const router = express.Router();

router.post("/single", createSingleUser);
router.post("/couple", createCoupleUser);
router.get("/single", getSingleUsers);
router.get("/couple", getCoupleUsers);
router.get("/single/:id", getSingleUserById);
router.get("/couple/:id", getCoupleUserById);
router.put("/single/:id", updateSingleUser);
router.put("/couple/:id", updateCoupleUser);
router.delete("/single/:id", deleteSingleUser);
router.delete("/couple/:id", deleteCoupleUser);
router.post("/", async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const filters = req.query; 
    const { page, limit } = req.query;
    const pagination = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const result = await getFilteredUsers(filters, pagination);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

router.get("/stats/new-users", async (req, res, next) => {
  try {
    const firstDay = dayjs().startOf("month").format("YYYY-MM-DD");
    const lastDay = dayjs().endOf("month").format("YYYY-MM-DD");

    const { rows } = await pool.query(
      `SELECT COUNT(*) as total FROM users WHERE created_at BETWEEN $1 AND $2`,
      [firstDay, lastDay]
    );
    res.json({ total: parseInt(rows[0].total) });
  } catch (err) {
    next(err);
  }
});


router.get("/stats/upcoming-anniversaries", async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users 
      WHERE anniversary_date IS NOT NULL 
      AND EXTRACT(DOY FROM anniversary_date) BETWEEN 
        EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
    `);
    res.json({ total: rows.length });
  } catch (err) {
    next(err);
  }
});


router.get("/stats/upcoming-birthdays", async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users WHERE
        (
          dob IS NOT NULL AND EXTRACT(DOY FROM dob) BETWEEN EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
        )
        OR (
          husband_dob IS NOT NULL AND EXTRACT(DOY FROM husband_dob) BETWEEN EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
        )
        OR (
          wife_dob IS NOT NULL AND EXTRACT(DOY FROM wife_dob) BETWEEN EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
        );
    `);
    res.json({ total: rows.length });
  } catch (err) {
    next(err);
  }
});

export default router;
