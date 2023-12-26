const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { randomKey } = require("@/backend/utils");
const {
  fetchImage,
  uploadImage,
  deleteImage,
} = require("@/backend/controllers/ImageController");

const directory = "./static/uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = randomKey(5) + Date.now();

    cb(null, fileName + fileExt);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.get("/", fetchImage);
router.post("/", upload.single("image"), uploadImage);
router.delete("/", deleteImage);

module.exports = router;
