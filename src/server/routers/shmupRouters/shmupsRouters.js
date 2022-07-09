require("dotenv").config();
const express = require("express");

const {
  getShmups,
  getVerticalShmups,
} = require("../../controllers/shmupsControllers/shmupsControllers");

const shmupsRouters = express.Router();

shmupsRouters.get("/list", getShmups);
shmupsRouters.get("/list/vertical", getVerticalShmups);

module.exports = shmupsRouters;
