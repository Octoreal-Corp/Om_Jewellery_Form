import express from "express";
import {
  createCoupleUser,
  createSingleUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/single/create", createSingleUser);
router.post("/couple/create", createCoupleUser);

export default router;
