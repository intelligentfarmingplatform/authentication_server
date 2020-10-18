const router = require("express").Router();
const verify = require("./verifyToken");
const db2 = require("../database/mysql2");

router.get("/", (req, res) => {
  const getUserprofile = "select * from products";
  db2.query(getUserprofile, (err, rows, field) => {
    if (err) {
      console.log("Failed to get userproducts");
      res.sendStatus(500);
      return;
    }
    res.json({ products: rows });
  });
});

router.get("/:id", (req, res) => {
  const getUserprofile = "select * from products where id =" + req.params.id;
  db2.query(getUserprofile, (err, rows, field) => {
    if (err) {
      console.log("Failed to get userproducts");
      res.sendStatus(500);
      return;
    }
    res.json({ products: rows });
  });
});
router.get("/featured/all", (req, res) => {
  const getUserprofile = "select * from products limit 4";
  db2.query(getUserprofile, (err, rows, field) => {
    if (err) {
      console.log("Failed to get userproducts");
      res.sendStatus(500);
      return;
    }
    res.json({ products: rows });
  });
});

module.exports = router;
