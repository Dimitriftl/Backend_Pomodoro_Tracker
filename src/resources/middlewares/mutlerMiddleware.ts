const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/Images"); // Set the destination folder for uploaded files
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname.toLowerCase().trim()); // Set a unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
