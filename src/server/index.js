const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const usersRouters = require("./routers/userRouters/usersRouters");
const messagesRouters = require("./routers/messageRouters/messagesRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use("/user", usersRouters);
app.use("/messages", messagesRouters);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
