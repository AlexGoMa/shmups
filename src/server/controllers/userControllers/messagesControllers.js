require("dotenv").config();
const jwt = require("jsonwebtoken");
const Message = require("../../../../database/models/Message");

const getMessages = async (req, res, next) => {
  const messages = await Message.find();
  if (messages.length !== 0) {
    res.status(200).json({ messages });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the DB";
    userError.statusCode = 400;
    next(userError);
  }
};

const getMessagesByCategory = async (req, res, next) => {
  const { category } = req.params;
  const messages = await Message.find({ category });
  if (messages.length !== 0) {
    res.status(200).json({ messages });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the DB";
    userError.statusCode = 400;
    next(userError);
  }
};

const getOneMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Message.findById(id);
    if (!result) {
      const userError = new Error();
      userError.customMessage = "Message not found in the DB";
      userError.statusCode = 404;
      next(userError);
    }
    res.status(200).json({ message: result });
  } catch (error) {
    error.customMessage = "Bad request";
    error.statusCode = 500;
    next(error);
  }
};

const getUserMessages = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  const { username } = jwt.verify(token, process.env.JWT_SECRET);

  const messages = await Message.find({ author: username });
  if (messages.length !== 0) {
    res.status(200).json({ messages });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the DB";
    userError.statusCode = 400;
    next(userError);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Message.findByIdAndDelete(id);
    if (!result) {
      const userError = new Error();
      userError.customMessage = "Message not found in the DB";
      userError.statusCode = 404;
      next(userError);
    }
    res.status(200).json({ message: "Message deleted correctly!" });
  } catch (error) {
    error.customMessage = "Bad request";
    error.statusCode = 500;
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { text, category } = req.body;
    const { img, imgBackup } = req;

    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    const newMessage = {
      text,
      category,
      author: username,
      image: img,
      imageBackup: imgBackup,
    };
    await Message.create(newMessage);
    res.status(201).json({ newMessage });
  } catch (error) {
    next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messageBody = req.body;
    const { file, img, imgBackup } = req;
    const currentMessage = await Message.findById(id);

    if (!file) {
      const updatedMessage = {
        ...messageBody,
        author: currentMessage.author,
        image: currentMessage.image,
        imageBackup: currentMessage.imageBackup,
      };
      const newMessage = await Message.findByIdAndUpdate(id, updatedMessage);
      res.status(201).json({ newMessage });
    } else {
      const updatedMessage = {
        ...messageBody,
        author: currentMessage.author,
        image: img,
        imageBackup: imgBackup,
      };
      const newMessage = await Message.findByIdAndUpdate(id, updatedMessage);
      res.status(201).json({ newMessage });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  getMessagesByCategory,
  getOneMessage,
  getUserMessages,
  deleteMessage,
  createMessage,
  updateMessage,
};
