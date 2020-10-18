"use strict";

var router = require("express").Router();

var Product = require("../model/product");

var main = require("../middlewares/upload-img");

var _require = require("@google-cloud/storage"),
    Storage = _require.Storage;

var Multer = require("multer");

var upload = Multer({
  storage: Multer.memoryStorage()
});
var storage = new Storage({
  keyFilename: "ifp-imgupload-firebase-adminsdk-q5dwv-78b9ee228e.json"
});
var bucket = storage.bucket("ifp-imgupload.appspot.com"); // post request - create new Prodducts

router.post("/products", upload.single("productimg"), function (req, res, next) {
  try {
    var product = new Product();
    var blob = bucket.file(req.file.originalname); // Create writable stream and specifying file mimetype

    var blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(500).json({
        success: false,
        message: "Invalid File !!"
      });
    }

    blobWriter.on("error", function (err) {
      return next(err);
    });
    blobWriter.on("finish", function () {
      // Assembling public URL for accessing the file via HTTP
      var publicUrl = "https://firebasestorage.googleapis.com/v0/b/".concat(bucket.name, "/o/").concat(encodeURI(blob.name), "?alt=media");
      product.title = req.body.title, product.decription = req.body.description, product.productimg = publicUrl, product.stockQty = req.body.stockQty;
      product.save();
      console.log(publicUrl);
    }); // When there is no more data to be consumed from the stream

    blobWriter.end(req.file.buffer);
    res.json({
      status: true,
      message: "Successfully saved",
      data: req.file
    });
  } catch (err) {
    if (!req.file) return res.status(500).json({
      success: false,
      message: "No image file uploaded"
    });
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}); // get request get all products

router.get("/products", function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context.sent;
          res.json({
            products: products
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get request get a single product

router.get("/products/:id", function _callee2(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 3:
          product = _context2.sent;
          res.json({
            product: product
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // put request update a single product

router.put("/products/:id", upload.single("productimg"), function _callee3(req, res, next) {
  var product, blob, blobWriter, publicUrl;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            id: req.params.id
          }, {
            returnOriginal: false,
            upsert: true
          }));

        case 3:
          product = _context3.sent;
          blob = bucket.file(req.file.originalname);
          blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.file.mimetype
            }
          });
          blobWriter.on("error", function (err) {
            return next(err);
          });
          publicUrl = "https://firebasestorage.googleapis.com/v0/b/".concat(bucket.name, "/o/").concat(encodeURI(blob.name), "?alt=media");
          console.log(publicUrl);
          blobWriter.on("finish", function () {
            (product.title = req.body.title)(product.price = req.body.price)(product.category = req.body.categoryID)(product.productimg = publicUrl)(product.description = req.body.description)(product.owner = req.body.ownerID)(product.stockQty = req.body.stockQty)(product.price = req.body.price);
            console.log(publicUrl);
          });
          res.json({
            updatedProduct: product
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            message: _context3.t0.message
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // delete request delete a single product

module.exports = router;