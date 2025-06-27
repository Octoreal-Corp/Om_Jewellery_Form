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
  createUserController,
  getNewUsersCount,
  getUpcomingAnniversaries,
  getUpcomingBirthdays,
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
router.get("/stats/new-users", getNewUsersCount);
router.get("/stats/upcoming-anniversaries", getUpcomingAnniversaries);
router.get("/stats/upcoming-birthdays", getUpcomingBirthdays);
router.post("/", createUserController);

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

export default router;
