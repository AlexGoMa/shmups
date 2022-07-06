require("dotenv").config();
const express = require("express");

const {
  getShmups,
} = require("../../controllers/userControllers/messagesControllers");

const shmupsRouters = express.Router();

shmupsRouters.get("/list", getShmups);

module.exports = shmupsRouters;
