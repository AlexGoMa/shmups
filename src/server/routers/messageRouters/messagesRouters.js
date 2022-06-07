require("dotenv").config();
const express = require("express");
const {
  getMessages,
  deleteMessage,
  createMessage,
} = require("../../controllers/userControllers/messagesControllers");

const { auth } = require("../../middlewares/auth");

const messagesRouters = express.Router();

messagesRouters.get("/list", auth, getMessages);
messagesRouters.delete("/:id", deleteMessage);
messagesRouters.post("/:id", createMessage);

module.exports = messagesRouters;
