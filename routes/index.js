"use strict";

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
      console.log(file,"ff");
      const routes = require(path.join(__dirname, file));
    router.use(`/${file.replace(".js", "")}`, routes);
  });

  module.exports = router;