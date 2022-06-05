require("dotenv").config();
const express = require("express");
const {
  getMessages,
  deleteMessage,
} = require("../../controllers/userControllers/messagesControllers");

const messagesRouters = express.Router();

messagesRouters.get("/list", getMessages);
messagesRouters.delete("/:id", deleteMessage);

module.exports = messagesRouters;
