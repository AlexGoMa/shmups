require("dotenv").config();
const Shmups = require("../../../../database/models/Shmups");

const getShmups = async (req, res, next) => {
  const shmups = await Shmups.find().sort({ name: "asc" });
  if (shmups.length !== 0) {
    res.status(200).json({ shmups });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the DB";
    userError.statusCode = 400;
    next(userError);
  }
};

const getVerticalShmups = async (req, res, next) => {
  const shmups = await Shmups.find({ screen: "Vertical" }).sort({
    name: "asc",
  });
  if (shmups.length !== 0) {
    res.status(200).json({ shmups });
  } else {
    const userError = new Error();
    userError.customMessage = "No messages in the DB";
    userError.statusCode = 400;
    next(userError);
  }
};

module.exports = {
  getShmups,
  getVerticalShmups,
};
