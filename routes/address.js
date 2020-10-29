const router = require("express").Router();
const Address = require("../model/address");
const verify = require("./verifyToken");
router.post("/addresses", verify, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.district = req.body.district;
    address.province = req.body.province;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.note = req.body.note;

    await address.save();
    res.json({
      success: true,
      message: "Successfully added an address",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/addresses", verify, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses: addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
