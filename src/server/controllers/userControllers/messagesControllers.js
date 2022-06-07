require("dotenv").config();
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
  const { text, image, category, id } = req.body;
  try {
    const newMessage = {
      text,
      image,
      category,
      author: id,
    };

    await Message.create(newMessage);
    res.status(201).json({ newMessage });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages, deleteMessage, createMessage };
