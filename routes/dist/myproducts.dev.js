"use strict";

var router = require("express").Router();

var verify = require("./verifyToken");

var db2 = require("../database/mysql2");

var mm = require("../middlewares/mqtt");

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
router.get("/:id", function (req, res) {
  var getUserprofile = "select * from products where id =" + req.params.id;
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
router.get("/featured/all", function (req, res) {
  var getUserprofile = "select * from products limit 4";
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
router.get("/sensor/all", function (req, res) {
  var getSensorStatus = mm;
  console.log(getSensorStatus);
  res.json({
    message: getSensorStatus
  });
});
module.exports = router;