const router = require("express").Router();
const Order = require("../model/order");
const verify = require("./verifyToken");

router.get("/orders", verify, async (req, res) => {
  try {
    let products = await Order.find({ owner: req.decoded._id })
      .deepPopulate("owner products.productID.users", "-password -email")
      .exec();
    res.json({
      success: true,
      message: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;