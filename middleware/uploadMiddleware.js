const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'al-ozhan-products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) =>
      `${file.fieldname}-${Date.now()}`,
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;

const extname = filetypes.test(
  require('path').extname(file.originalname).toLowerCase()
);

const mimetype = filetypes.test(file.mimetype);

 if (mimetype && extname) {
  return cb(null, true);
 }
  else {
    cb(new Error('Images only (jpg, jpeg, png, webp)!'));
  }
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;