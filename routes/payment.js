const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verify = require("./verifyToken");
const Order = require("../model/order");

const SHIPMENT = {
  normal: {
    price: 25,
    days: 5,
  },
  express: {
    price: 40,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  let estimated = moment().add(shipmentOption.days, "d").format("dddd MMMM Do");
  return { estimated, price: shipmentOption.price };
}
router.post("/shipment", (req, res) => {
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.express);
  }

  res.json({
    success: true,
    shipment: shipment,
  });
});

router.post("/payment", verify,(req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.decoded.email,
    })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa",
      });
    })
    .then((source) => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "thb",
        customer: source.customer,
      });
    })
    .then(async (charge) => {
      let order = new Order();
      let cart = req.body.cart;

      cart.map((product) => {
        order.product.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });
      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();
      res.json({
        success:true,
        message:"Successfully made a payment"
      })
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
