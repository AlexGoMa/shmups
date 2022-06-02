require("dotenv").config();
const express = require("express");
const getMessages = require("../../controllers/userControllers/messagesControllers");

const messagesRouters = express.Router();

messagesRouters.post("/list", getMessages);

module.exports = messagesRouters;
