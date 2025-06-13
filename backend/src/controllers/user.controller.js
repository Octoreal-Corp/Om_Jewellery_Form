import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Single Users
const createSingleUser = asyncHandler(async (req, res, next) => {
  const {
    marital_status,
    name,
    phone,
    whatsapp,
    dob,
    occupation,
    community,
    address,
    pincode,
  } = req.body;

  const data = {
    marital_status,
    name,
    phone,
    whatsapp,
    dob,
    occupation,
    community,
    address,
    pincode,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    id: crypto.randomUUID(),
  };

  const dbDir = path.join(__dirname, "../../db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const filePath = path.join(dbDir, "single-users.json");

  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent);
    }

    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return res
      .status(201)
      .json(new ApiResponse(201, "Single User created successfully", data));
  } catch (error) {
    return next(new ApiError("Failed to create user: " + error.message, 500));
  }
});

const getSingleUsers = asyncHandler(async (req, res, next) => {
  const filePath = path.join(__dirname, "../../db/single-users.json");
  const data = fs.readFileSync(filePath, "utf8");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Single Users fetched successfully",
        JSON.parse(data)
      )
    );
});

const getSingleUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../../db/single-users.json");
  const data = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(data).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Single User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Single User fetched successfully", user));
});

const updateSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const filePath = path.join(__dirname, "../../db/single-users.json");
  const existingData = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(existingData).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Single User not found", 404));
  }

  const updatedData = {
    ...user,
    ...data,
    updated_at: new Date().toISOString(),
  };

  const updatedDataArray = JSON.parse(existingData).map((user) =>
    user.id === id ? updatedData : user
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedDataArray, null, 2));

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Single User updated successfully", updatedData)
    );
});

const deleteSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../../db/single-users.json");
  const existingData = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(existingData).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Single User not found", 404));
  }

  const updatedDataArray = JSON.parse(existingData).filter(
    (user) => user.id !== id
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedDataArray, null, 2));

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Single User deleted successfully", updatedDataArray)
    );
});

// Couple Users
const createCoupleUser = asyncHandler(async (req, res, next) => {
  const data = {
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    id: crypto.randomUUID(),
  };

  const dbDir = path.join(__dirname, "../../db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const filePath = path.join(dbDir, "couple-users.json");

  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent);
    }

    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return res
      .status(201)
      .json(new ApiResponse(201, "Couple User created successfully", data));
  } catch (error) {
    return next(new ApiError("Failed to create user: " + error.message, 500));
  }
});

const getCoupleUsers = asyncHandler(async (req, res, next) => {
  const filePath = path.join(__dirname, "../../db/couple-users.json");
  const data = fs.readFileSync(filePath, "utf8");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Couple Users fetched successfully",
        JSON.parse(data)
      )
    );
});

const getCoupleUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../../db/couple-users.json");
  const data = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(data).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Couple User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Couple User fetched successfully", user));
});

const updateCoupleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const filePath = path.join(__dirname, "../../db/couple-users.json");
  const existingData = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(existingData).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Couple User not found", 404));
  }

  const updatedData = {
    ...user,
    ...data,
    updated_at: new Date().toISOString(),
  };

  const updatedDataArray = JSON.parse(existingData).map((user) =>
    user.id === id ? updatedData : user
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedDataArray, null, 2));

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Couple User updated successfully", updatedData)
    );
});

const deleteCoupleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../../db/couple-users.json");
  const existingData = fs.readFileSync(filePath, "utf8");
  const user = JSON.parse(existingData).find((user) => user.id === id);

  if (!user) {
    return next(new ApiError("Couple User not found", 404));
  }

  const updatedDataArray = JSON.parse(existingData).filter(
    (user) => user.id !== id
  );

  console.log(updatedDataArray);

  fs.writeFileSync(filePath, JSON.stringify(updatedDataArray, null, 2));

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Couple User deleted successfully", updatedDataArray)
    );
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
};
