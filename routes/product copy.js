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

const storage = new Storage({
  keyFilename: "ifp-imgupload-firebase-adminsdk-q5dwv-78b9ee228e.json",
});
const bucket = storage.bucket("ifp-imgupload.appspot.com");
const uploadFileTGcs = async (file) => {
  let promises = [];
  _.forEach(file, (value, key) => {
    const { buffer} = value;
    const blob = bucket.file(req.file.originalname);

    const promise = new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
        public: true,
      });
      blobStream.on('error', () => {
        reject(`Unable to upload image, something went wrong`);
      }).on('finish', async () => {
        const publicUrl = format(
          `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`,
        );
        resolve(publicUrl);
      }).end(buffer);
    });
    promises.push(promise);
  });
  return Promise.all(promises).then(promises => {
    return promises;
  });
};

////test
router.post('/create', async (req, res, next) => {
  res.json({
    posts: { title: "test post", description: "this is a description naja" },
  });
  try {
    console.log(req.body)
    if (!req.files) {
      res.status(400).json({
        messages: 'No file uploaded',
      });
      return;
    }

    const promiseReturned = await uploadFileTGcs(req.files);
    (productimg = req.file)

    res.status(promiseReturned ? 200 : 404).json({
      result: promiseReturned, //here I'm returning the url of the files stored in gcs
      message: 'Post created',
    });
  } catch (e) {
    res.status(500).json({
      result: e.toString(),
    });
  }
});




////test




// post request - create new Prodducts
router.post("/products", upload.single("productimg"), (req, res, next) => {
  try {
    const product = new Product();
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
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
    blobWriter.on("finish", () => {
      // Assembling public URL for accessing the file via HTTP

    });

    (product.title = req.body.title),
    (product.decription = req.body.description),
    (product.productimg = publicUrl),
    (product.stockQty = req.body.stockQty);
  product.save();
  console.log(publicUrl);
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
router.put("/products/:id",upload.single("productimg"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          productimg: uploadFileTGcs(publicUrl),
          description: req.body.description,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );
    if (!req.files) {
      res.status(400).json({
        messages: 'No file uploaded',
      });
      return;
    }
    const promiseReturned = await uploadFileTGcs(req.files);
    res.status(promiseReturned ? 200 : 404).json({
      result: promiseReturned, //here I'm returning the url of the files stored in gcs
      message: 'Post created',
    });
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

module.exports = router;
