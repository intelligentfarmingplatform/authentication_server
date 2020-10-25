const mongoose = require("mongoose");
const router = require("express").Router();
const verify = require("./verifyToken");
const profile = require("../model/User")

// GET all
router.get("/",verify, (req, res) => {
  profile.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json('users',data);
  });
});


module.exports = router;
