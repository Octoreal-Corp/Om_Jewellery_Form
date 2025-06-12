import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSingleUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new ApiResponse(200, "Single User created successfully", req.body));
});

const createCoupleUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new ApiResponse(200, "Couple User created successfully", req.body));
});

export { createSingleUser, createCoupleUser };
