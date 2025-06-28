import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config({
  path: "./.env",
});


const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});




app.use(cors());
app.use(express.json()); 


app.use("/api/users", userRoutes);


app.use(errorHandler);


app.listen(process.env.PORT, async () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
