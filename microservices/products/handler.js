const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from products!",
  });
});

app.get("/products", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from /products",
  });
});

app.get("/products/:id", (req, res, next) => {
  return res.status(200).json({
    message: req.params.id,
  });
});


module.exports.handler = serverless(app);
