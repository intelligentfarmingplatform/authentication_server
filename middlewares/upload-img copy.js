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
  
//const bucket = 'ifp-imgupload.appspot.com'

  


  
  module.exports = {upload,bucket}
