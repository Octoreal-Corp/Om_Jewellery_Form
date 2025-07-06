import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from './routes/authRoutes.js'; 
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));





app.use("/api/v1/users", userRouter);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
