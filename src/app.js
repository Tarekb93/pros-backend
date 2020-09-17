const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const controllers = require("./controllers/index");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie-parser here
app.use(cookieParser());
app.set("port", process.env.PORT || 4000);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(controllers);

module.exports = app;
