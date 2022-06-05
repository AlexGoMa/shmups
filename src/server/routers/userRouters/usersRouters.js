require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  registerUser,
  loginUser,
} = require("../../controllers/userControllers/userControllers");
const { userRegisterSchema } = require("../../schemas/userCredentialsSchema");

const usersRouters = express.Router();

usersRouters.post("/register", validate(userRegisterSchema), registerUser);

usersRouters.post("/login", loginUser);

module.exports = usersRouters;
