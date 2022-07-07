require("dotenv").config();
const express = require("express");

const {
  getShmups,
} = require("../../controllers/shmupsControllers/shmupsControllers");

const shmupsRouters = express.Router();

shmupsRouters.get("/list", getShmups);

module.exports = shmupsRouters;
