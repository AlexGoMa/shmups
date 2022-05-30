require("dotenv").config();
const debug = require("debug")("japanthings:server:initializeServer");
const express = require("express");
const registerUser = require("../../server/controllers/userControllers/userControllers");

const usersRouters = express.Router();

usersRouters.post("/register", registerUser);
debug("everythingOK");

module.exports = usersRouters;
