const router = require("express").Router();
const Category = require("../model/category");

//POST request
router.post("/category", async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;
    await category.save();
    res.json({
      success: true,
      message: "Successfully created a new category",
    });
  } catch (err) {
    {
      if (!req.body.type)
        return res.status(500).json({
          success: false,
          message: "Type is null",
        });
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

//GET
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
