const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verify = require("./verifyToken");
const Order = require("../model/order");
//My SQL
const db = require("../database/mysql");

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

router.post("/payment", verify, (req, res) => {
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
        console.log("this is from cat map", product);
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });
      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
//       const saveOrderToMysql = `insert into tbl_orders (nameuser,addressuser,teluser,list_order,totalpice_order,status_order,createdAt,serial_number) values (${order.owner},${order.owner.address},${order.owner.phoneNumber},${this.cart},${this.price},'Order',NOW(),'ifp_2020')`;
//        db.query(saveOrderToMysql, (err, result) => {
// console.log(result)
//      });
      await order.save();

      res.json({
        success: true,
        message: "Successfully made a payment",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
