const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "test post", description: "this is a description naja" },
  });
});

module.exports = router;
