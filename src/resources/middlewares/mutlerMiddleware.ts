const multer = require("multer");
// import uuid
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images"); // Set the destination folder for uploaded files
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + "-" + `${uuid.v4()}.png`); // Set a unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
