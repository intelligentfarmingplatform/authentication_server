const router = require("express").Router();
const Address = require("../model/address");
const User = require("../model/User");
const verify = require("./verifyToken");

//Post - API Create an address
router.post("/addresses", verify, async (req, res) => {
  try {
    let address = new Address();
    address.users = req.decoded._id;
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

// router.get("/addresses/:id", verify, async (req, res) => {
//   try {
//     let address = await Address.findOne({ _id: req.params.id });

//     res.json({
//       success: true,
//       address: address,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

//GET - API Get all addresses
router.get("/addresses", verify, async (req, res) => {
  try {
    const addresses = await Address.find({ "users": req.decoded._id },function(err, item) {
      console.log(item);
  });
    if(addresses){
      res.json({
        success: true,
        address: addresses,
      });
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
//PUT - API Update an address
router.put("/addresses/:id", verify, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({
      users: req.decoded._id,
      _id: req.params.id,
    });
    if (foundAddress) {
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.district) foundAddress.district = req.body.district;
      if (req.body.province) foundAddress.province = req.body.province;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.note) foundAddress.note = req.body.note;
      await foundAddress.save();
      res.json({
        success: true,
        message: "Successfully Updated the address",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//DELETE - API Delete an address
router.delete("/addresses/:id", verify, async (req, res) => {
  try {
    let deletedAddress = await Address.remove({
      users: req.decoded._id,
      _id: req.params.id,
    });
    if (deletedAddress) {
      res.json({
        success: true,
        message: "Address has been deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//PUT - API set defalut address
router.put("/addresses/set/default", verify, async (req, res) => {
  try {
    let updatedAddressUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );
    if (updatedAddressUser) {
      res.json({
        success: true,
        message: "Successfully set this address as default",
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
