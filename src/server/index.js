const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const shmupsRouters = require("./routers/shmupRouters/shmupsRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/shmups", shmupsRouters);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
