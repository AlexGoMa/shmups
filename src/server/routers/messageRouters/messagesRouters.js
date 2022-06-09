require("dotenv").config();
const express = require("express");
const {
  getMessages,
  deleteMessage,
  createMessage,
  getUserMessages,
} = require("../../controllers/userControllers/messagesControllers");

const { auth } = require("../../middlewares/auth");

const messagesRouters = express.Router();

messagesRouters.get("/list", auth, getMessages);
messagesRouters.delete("/:id", auth, deleteMessage);

messagesRouters.get("/mine", auth, getUserMessages);
messagesRouters.post("/mine/create", auth, createMessage);

module.exports = messagesRouters;
