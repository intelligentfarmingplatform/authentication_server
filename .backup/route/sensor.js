const router = require("express").Router();
const verify = require("./verifyToken");
const db2 = require("../database/mysql2");
var mm = require("../middlewares/mqtt");



router.post("/owners", async (req, res) => {
    try {
      let owner = new Owner();
      owner.name = req.body.name;
      owner.about = req.body.about;
      await owner.save();
      res.json({
        success: true,
        message: "Successfully created a new owner",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  });

router.get("/pumpA", (req, res) => {
    const pumpA= mm
    console.log(pumpA)
    res.json({
      message: pumpA
    })
  
  });
  router.get("/pumpB", (req, res) => {
    const getSensorStatus= mm
    console.log(getSensorStatus)
    res.json({
      message: getSensorStatus
    })
  
  });

  router.get("/pumpC", (req, res) => {
    const getSensorStatus= mm
    console.log(getSensorStatus)
    res.json({
      message: getSensorStatus
    })
  
  });

  router.get("/pumpD", (req, res) => {
    const getSensorStatus= mm
    console.log(getSensorStatus)
    res.json({
      message: getSensorStatus
    })
  
  });

  module.exports = router;