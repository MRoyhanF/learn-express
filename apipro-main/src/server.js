"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const isAuth = require("./isAuth");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

const users = require("./db.json");

app.get("/request", (req, res) => {
  const username = req.query.username;

  const response = {
    username: username,
    apiKey: process.env.API_KEY,
  };

  res.status(201).json(response);
});

app.get("/users", isAuth, (_, res) => {
  res.status(200).json(users);
});

app.get("/", (_, res) =>
  res.status(200).json({
    status: 200,
    name: "cuyuniverse-free-api",
    version: "1.0.0",
    docs_link: "https://docs.deaafrizal.com",
    health_check: "100",
    is_open: true,
  })
);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
