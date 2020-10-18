"use strict";

var router = require("express").Router();

var verify = require("./verifyToken");

var db2 = require('../database/mysql2');

router.get("/", function (req, res) {
  var getUserprofile = "select * from products";
  db2.query(getUserprofile, function (err, rows, field) {
    if (err) {
      console.log("Failed to get userproducts");
      res.sendStatus(500);
      return;
    }

    res.json({
      products: rows
    });
  });
});
module.exports = router;