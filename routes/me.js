const mongoose = require("mongoose");
const router = require("express").Router();
const verify = require("./verifyToken");
const profile = require("../model/User")

// GET all
router.get("/",verify, (req, res) => {
  profile.find(req.email).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log('cookie',req.cookies)
    res.status(200).json({email: req.email});
  });
});


module.exports = router;
