const express = require("express");
const { createUser, handleLogin, getUser, getAccount } = require("../controllers/userController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routeAPI = express.Router();

// Áp middleware auth cho tất cả trừ whitelist
routeAPI.use(auth);

routeAPI.get("/", (req, res) => {
    res.status(200).json("Hello word api");
});

routeAPI.post("/register", createUser);
routeAPI.post("/login", handleLogin);

routeAPI.get("/user", getUser);
routeAPI.get("/account", delay, getAccount);

module.exports = routeAPI;
