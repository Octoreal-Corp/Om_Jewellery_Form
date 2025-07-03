import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { buildFilterQuery } from "../utils/queryBuilder.js";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFilteredUsers,
} from "../models/user.models.js";
import pool from "../db/db.js";
import dayjs from "dayjs";



const createSingleUser = asyncHandler(async (req, res, next) => {
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
  } = req.body;

  const newUser = await createUser({
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
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Single User created successfully", newUser));
});

const getSingleUsers = asyncHandler(async (req, res, next) => {
  const filters = { ...req.query };

  const pagination = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    sort_by: req.query.sort_by || 'user_id',
    sort_order: req.query.sort_order || 'DESC'
  };

  const result = await getFilteredUsers(filters, pagination);

  
  result.data = result.data.filter(
    (user) => user.name && !user.husband_name && !user.wife_name
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Single Users fetched successfully", result));
});

const getSingleUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user || !user.name || user.husband_name || user.wife_name) {
    return next(new ApiError("Single User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Single User fetched successfully", user));
});

const updateSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updated = await updateUser(id, {
    ...req.body,
    updated_at: new Date().toISOString(),
  });

  if (!updated) {
    return next(new ApiError("Single User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Single User updated successfully", updated));
});

const deleteSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await deleteUser(id);

  if (!deleted) {
    return next(new ApiError("Single User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Single User deleted successfully", deleted));
});



const createCoupleUser = asyncHandler(async (req, res, next) => {
  const {
    marital_status,
    husband_name,
    wife_name,
    phone,
    whatsapp,
    husband_dob,
    wife_dob,
    anniversary_date,
    husband_occupation,
    wife_occupation,
    husband_samaj,
    wife_samaj,
    address,
    pincode,
  } = req.body;

  const newUser = await createUser({
    marital_status,
    husband_name,
    wife_name,
    phone,
    whatsapp,
    husband_dob,
    wife_dob,
    anniversary_date,
    husband_occupation,
    wife_occupation,
    husband_samaj,
    wife_samaj,
    address,
    pincode,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Couple User created successfully", newUser));
});

const getCoupleUsers = asyncHandler(async (req, res, next) => {
  const users = await getAllUsers();
  const couples = users.filter(
    (user) => user.husband_name && user.wife_name
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Couple Users fetched successfully", couples));
});

const getCoupleUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user || !user.husband_name || !user.wife_name) {
    return next(new ApiError("Couple User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Couple User fetched successfully", user));
});


const updateCoupleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updated = await updateUser(id, {
    ...req.body,
    updated_at: new Date().toISOString(),
  });

  if (!updated) {
    return next(new ApiError("Couple User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Couple User updated successfully", updated));
});

const deleteCoupleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await deleteUser(id);

  if (!deleted) {
    return next(new ApiError("Couple User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Couple User deleted successfully", deleted));
});

const createUserController = asyncHandler(async (req, res, next) => {
  const userData = req.body;

  const newUser = await createUser(userData);

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", newUser));
});


const getNewUsersCount = asyncHandler(async (req, res, next) => {
  const first = dayjs().startOf("month").format("YYYY-MM-DD");
  const last = dayjs().endOf("month").format("YYYY-MM-DD");

  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM users WHERE created_at BETWEEN $1 AND $2`,
    [first, last]
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "New users count", { total: parseInt(rows[0].count) }));
});


const getUpcomingAnniversaries = asyncHandler(async (req, res, next) => {
  const { rows } = await pool.query(`
    SELECT * FROM users 
    WHERE anniversary_date IS NOT NULL 
    AND EXTRACT(DOY FROM anniversary_date) BETWEEN 
      EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
  `);

  return res
    .status(200)
    .json(new ApiResponse(200, "Upcoming anniversaries", { total: rows.length }));
});

// Get users with upcoming birthdays (dob, husband_dob, wife_dob)
const getUpcomingBirthdays = asyncHandler(async (req, res, next) => {
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

  return res
    .status(200)
    .json(new ApiResponse(200, "Upcoming birthdays", { total: rows.length }));
});





export {
  createSingleUser,
  getSingleUsers,
  getSingleUserById,
  updateSingleUser,
  deleteSingleUser,
  createCoupleUser,
  getCoupleUsers,
  getCoupleUserById,
  updateCoupleUser,
  deleteCoupleUser,
  getNewUsersCount,
  getUpcomingAnniversaries,
  getUpcomingBirthdays,
  createUserController,
};
