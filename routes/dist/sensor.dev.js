"use strict";

var router = require("express").Router();

var verify = require("./verifyToken");

var db2 = require("../database/mysql2");

var mm = require("../middlewares/mqtt");

router.post("/owners", function _callee(req, res) {
  var owner;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          owner = new Owner();
          owner.name = req.body.name;
          owner.about = req.body.about;
          _context.next = 6;
          return regeneratorRuntime.awrap(owner.save());

        case 6:
          res.json({
            success: true,
            message: "Successfully created a new owner"
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get("/pumpA", function (req, res) {
  var pumpA = mm;
  console.log(pumpA);
  res.json({
    message: pumpA
  });
});
router.get("/pumpB", function (req, res) {
  var getSensorStatus = mm;
  console.log(getSensorStatus);
  res.json({
    message: getSensorStatus
  });
});
router.get("/pumpC", function (req, res) {
  var getSensorStatus = mm;
  console.log(getSensorStatus);
  res.json({
    message: getSensorStatus
  });
});
router.get("/pumpD", function (req, res) {
  var getSensorStatus = mm;
  console.log(getSensorStatus);
  res.json({
    message: getSensorStatus
  });
});
module.exports = router;