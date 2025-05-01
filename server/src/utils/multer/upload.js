const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = req.body.folder || "others";
    const uploadPath = `./uploads/${folderName}/`;

    // যদি folder না থাকে, তৈরি করে দাও
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const now = new Date();
    const formattedDate = now.getFullYear().toString()
        + (now.getMonth() + 1).toString().padStart(2, '0')
        + now.getDate().toString().padStart(2, '0')
        + "_"
        + now.getHours().toString().padStart(2, '0')
        + now.getMinutes().toString().padStart(2, '0')
        + now.getSeconds().toString().padStart(2, '0');

    const randomNum = Math.floor(Math.random() * 10000); // 0-9999 পর্যন্ত random number

    const finalName = `${formattedDate}_${randomNum}${ext}`;

    cb(null, finalName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // max 5MB
  },
  fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Only JPG, JPEG, PNG allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
