const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const usersRouters = require("./routers/userRouters/usersRouters");
const messagesRouters = require("./routers/messageRouters/messagesRouters");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:4003",
    "https://alex-gomez-front-final-project-202204-bcn.netlify.app/",
    "https://alex-gomez-front-final-project-202204-bcn.netlify.app",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/user", usersRouters);
app.use("/messages", messagesRouters);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
