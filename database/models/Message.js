const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.String, ref: "User", required: true },
  fans: [{ type: Schema.Types.String, ref: "User", default: [] }],
});

const Message = model("Message", MessageSchema, "messages");

module.exports = Message;
