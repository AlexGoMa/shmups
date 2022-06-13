require("dotenv").config();
const express = require("express");

const multer = require("multer");
const path = require("path");

const {
  getMessages,
  deleteMessage,
  createMessage,
  getUserMessages,
  getOneMessage,
  updateMessage,
  getMessagesByCategory,
} = require("../../controllers/userControllers/messagesControllers");

const { auth } = require("../../middlewares/auth");
const firebase = require("../../middlewares/firebase"); //

const messagesRouters = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fieldSize: 1000000,
  },
});

messagesRouters.get("/list", auth, getMessages);
messagesRouters.get("/category/:category", auth, getMessagesByCategory);
messagesRouters.get("/mine", auth, getUserMessages);
messagesRouters.get("/one/:id", auth, getOneMessage);
messagesRouters.delete("/:id", auth, deleteMessage);
messagesRouters.put(
  "/update/:id",
  auth,
  upload.single("image"),
  firebase,
  updateMessage
);

messagesRouters.post(
  "/mine/create",
  auth,
  upload.single("image"),
  firebase,
  createMessage
);

module.exports = messagesRouters;
