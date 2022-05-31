require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  registerUser,
  loginUser,
} = require("../../controllers/userControllers/userControllers");
const credentialsRegisterSchema = require("../../schemas/userCredentialsSchema");

const usersRouters = express.Router();

usersRouters.post(
  "/register",
  validate(credentialsRegisterSchema),
  registerUser
);

usersRouters.post("/login", loginUser);

module.exports = usersRouters;
