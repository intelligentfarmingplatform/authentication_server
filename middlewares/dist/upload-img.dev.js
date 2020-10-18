"use strict";

function main() {
  var bucketName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'my-bucket';
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : req.file.originalname;

  var _require = require('@google-cloud/storage'),
      Storage = _require.Storage; // Creates a client


  var storage = new Storage();

  function uploadFile() {
    return regeneratorRuntime.async(function uploadFile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(storage.bucket(bucketName).upload(filename, {
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              // By setting the option `destination`, you can change the name of the
              // object you are uploading to a bucket.
              metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000'
              }
            }));

          case 2:
            console.log("".concat(filename, " uploaded to ").concat(bucketName, "."));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  uploadFile()["catch"](console.error); // [END storage_upload_file]
}

module.exports = {
  main: main
};