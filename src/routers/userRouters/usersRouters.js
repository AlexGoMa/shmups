require("dotenv").config();
const express = require("express");
const registerUser = require("../../server/controllers/userControllers/userControllers");

const usersRouters = express.Router();

usersRouters.post("/register", registerUser);

module.exports = usersRouters;
