require("dotenv").config();
const express = require("express");

const multer = require("multer");
const path = require("path");

const {
  getMessages,
  deleteMessage,
  createMessage,
  getUserMessages,
} = require("../../controllers/userControllers/messagesControllers");

const { auth } = require("../../middlewares/auth");

const messagesRouters = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fieldSize: 1024 * 1024,
  },
});

messagesRouters.get("/list", auth, getMessages);
messagesRouters.delete("/:id", auth, deleteMessage);

messagesRouters.get("/mine", auth, getUserMessages);
messagesRouters.post(
  "/mine/create",
  auth,
  upload.single("image"),
  createMessage
);

module.exports = messagesRouters;
