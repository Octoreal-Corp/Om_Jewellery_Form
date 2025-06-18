import express from "express";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routes
import userRouter from "./routes/user.routes.js";

// mount routes
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
