const { Schema, model } = require("mongoose");

const ShmupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgSquare: {
    type: String,
    required: false,
  },
  imgWide: {
    type: String,
    required: false,
  },
  screen: {
    type: String,
    required: true,
  },
  tate: {
    type: Boolean,
    required: true,
  },
});

const Shmups = model("Shmup", ShmupSchema, "shmups");

module.exports = Shmups;
