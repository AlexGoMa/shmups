require("dotenv").config();
const Message = require("../../../../database/models/Message");

const getMessages = async (req, res, next) => {
  const messages = await Message.find();
  if (messages.length !== 0) {
    res.status(200).json({ messages });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the BD";
    userError.statusCode = 400;
    next(userError);
  }
};

module.exports = getMessages;
