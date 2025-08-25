import express, { Application } from "express";

const configViewEngine = (app: Application): void => {
  app.use(express.static("./src/public")); // Thư mục chứa file tĩnh (CSS, JS, images,...)
  app.set("view engine", "ejs");           // Dùng EJS làm view engine
  app.set("views", "./src/views");         // Thư mục chứa các file .ejs
};

export default configViewEngine;
