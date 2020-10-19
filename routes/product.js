const router = require("express").Router();
const Product = require("../model/product");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
},
});
const bucketName = 'ifp-imgupload.appspot.com';
const storage = new Storage({
  keyFilename: "ifp-imgupload-firebase-adminsdk-q5dwv-78b9ee228e.json",
});
const bucket = storage.bucket("ifp-imgupload.appspot.com");
// post request - create new Prodducts
router.post("/products", upload.single("productimg"), (req, res, next) => {
  try {
    const products = new Product();
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    if (!req.file.mimetype.startsWith("image/")) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid File !!" });
    }

    blobWriter.on("error", (err) => next(err));

    blobWriter.on("finish", () => {
      console.log(req.file)
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      (products.title = req.body.title),
        (products.decription = req.body.description),
        (products.productimg = publicUrl),
        (products.stockQty = req.body.stockQty),
        (products.filename = req.file.originalname);
      products.save();
      console.log(publicUrl);
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);

    res.json({
      status: true,
      message: "Successfully saved",
      data: req.file,
    });
  } catch (err) {
    if (!req.file)
      return res.status(500).json({
        success: false,
        message: "No image file uploaded",
      });
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// get request get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// get request get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// put request update a single product
router.put("/products/:id",upload.single("productimg"), async (req, res,next) => {
  try {
    console.log(req.file);
    const product = await Product.findOne({ _id: req.params.id });
    const blob = bucket.file(req.file.originalname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => next(err));
console.log(product)


    blobWriter.on("finish",  () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
               product.title= req.body.title,
               product.price= req.body.price,
               product.category= req.body.categoryID,
               product.productimg= publicUrl,
               product.description= req.body.description,
               product.owner= req.body.ownerID,
               product.stockQty= req.body.stockQty,
               product.price= req.body.price
               product.save();
    })
    blobWriter.end(req.file.buffer);
    res.json({
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// delete request delete a single product
router.delete("/products/:id",async (req,res)=>{
  try{
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    console.log(deletedProduct.filename)
    if (deletedProduct){
      await storage.bucket(bucketName).file(deletedProduct.filename).delete();
      res.json({
        status:true,
        message:"Successfully Deleted"
      });
    }
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
