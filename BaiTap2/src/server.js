import express from "express";              // nạp express
import bodyParser from "body-parser";       // nạp body-parser lấy tham số từ client /user?id=7
import viewEngine from "./config/viewEngine"; 
import initWebRoutes from "./route/web";    // nạp file web từ Route
import connectDB from "./config/configdb";  
import dotenv from "dotenv";                // gọi hàm config của dotenv để chạy lệnh process.env.PORT

dotenv.config();

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969; // tạo tham số port lấy từ .env
// nếu PORT === undefined => port = 6969

// chạy server
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});
