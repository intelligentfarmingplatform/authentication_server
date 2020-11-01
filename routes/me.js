const mongoose = require("mongoose");
const router = require("express").Router();
const verify = require("./verifyToken");
const profile = require("../model/User");

// GET all
// router.get("/",verify, (req, res) => {
//   profile.find().exec((err, data) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({users: req.user});
//   });
// });

router.get("/", verify, async (req, res) => {
  try {
    let foundUser = await profile.findOne({ _id: req.decoded._id }).populate('-password -id_card -address').exec();;
    if (foundUser) {
      res.json({
        success: true,
        users: foundUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
