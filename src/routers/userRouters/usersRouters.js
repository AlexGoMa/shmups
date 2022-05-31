require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const registerUser = require("../../server/controllers/userControllers/userControllers");
const credentialsRegisterSchema = require("../../server/schemas/userCredentialsSchema");

const usersRouters = express.Router();

usersRouters.post(
  "/register",
  validate(credentialsRegisterSchema),
  registerUser
);

module.exports = usersRouters;
