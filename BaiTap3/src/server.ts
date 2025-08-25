import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/configdb";

// 📌 Load biến môi trường từ .env
dotenv.config();

const app: Application = express();

// 📌 Middleware parse request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📌 Setup view engine (EJS)
configViewEngine(app);

// 📌 Setup web routes
initWebRoutes(app);

// 📌 Kết nối DB
connectDB();

// 📌 Lấy port từ .env hoặc fallback
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 6969;

// 📌 Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Backend Node.js is running on http://localhost:${PORT}`);
});
