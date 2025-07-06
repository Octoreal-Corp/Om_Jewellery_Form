import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import customerRoutes from './routes/customers.js';
import eventRoutes from './routes/events.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config({
  path: "./.env",
});


const app = express();
const PORT = process.env.PORT || 8000;



const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use("/api", authRoutes);

app.use('/api/customers', customerRoutes);

app.use('/api/events', eventRoutes);

app.use('/uploads', express.static('uploads'));



app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




app.use("/api/users", userRoutes);


app.use(errorHandler);


app.listen(process.env.PORT, async () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
