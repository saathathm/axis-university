const fs = require("fs");
const path = require("path");

const multer = require("multer");

const uploadRoot = path.join(__dirname, "../../uploads");

const ensureDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.uploadFolder || "general";
    const destination = path.join(uploadRoot, folder);

    ensureDirectory(destination);
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    cb(null, `${safeName}-${Date.now()}${extension}`);
  },
});

const imageMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const allowedMimeTypes = [
  ...imageMimeTypes,
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const createFileFilter = (mimeTypes) => {
  return (req, file, cb) => {
    if (mimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error("Invalid file type"));
  };
};

const upload = multer({
  storage,
  fileFilter: createFileFilter(allowedMimeTypes),
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  },
});

const imageUpload = multer({
  storage,
  fileFilter: createFileFilter(imageMimeTypes),
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  },
});

const setUploadFolder = (folder) => {
  return (req, res, next) => {
    req.uploadFolder = folder;
    next();
  };
};

module.exports = {
  imageUpload,
  upload,
  setUploadFolder,
};
