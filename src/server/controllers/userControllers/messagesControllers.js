require("dotenv").config();
const debug = require("debug")("japanthings:messagesController");
const Message = require("../../../../database/models/Message");

const getMessages = async () => {
  const messages = await Message.find();
  debug(messages);
};

module.exports = getMessages;
