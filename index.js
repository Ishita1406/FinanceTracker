import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./backend/routes/user.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import incomeRouter from "./backend/routes/income.route.js";
import expenseRouter from "./backend/routes/expense.route.js";
import dashboardRouter from "./backend/routes/dashboard.route.js";
import path from "path";
dotenv.config();

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const _dirname = path.resolve(); 

app.use(cors());
app.get("/", (req, res) => {
    res.send("Backend is running");
  });

app.use("/backend/auth", userRouter);
app.use("/backend/income", incomeRouter);
app.use("/backend/expense", expenseRouter);
app.use("/backend/dashboard", dashboardRouter);

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(_dirname, '/frontend/dist')));
app.get(/^\/(?!server\/|uploads\/).*/, (_, res) => {
    res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
