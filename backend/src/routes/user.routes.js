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
export default router;
