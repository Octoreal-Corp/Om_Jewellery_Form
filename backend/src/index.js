import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, async () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
