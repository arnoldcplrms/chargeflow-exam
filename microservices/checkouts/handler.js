const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from checkouts!",
  });
});

app.get("/checkouts", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from /checkouts",
  });
});

app.get("/checkouts/:id", (req, res, next) => {
  return res.status(200).json({
    message: req.params.id,
  });
});

module.exports.handler = serverless(app);
