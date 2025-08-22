import express from "express"

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));   // Thiet lap thu muc tinh
    app.set("view engine", "ejs") // Thiet lap engine
    app.set("views", "./src/views") // Thiet lap thu muc chua views
}
module.exports = configViewEngine;