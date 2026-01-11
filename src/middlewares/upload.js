const multer = require('multer');
const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'uploads' },
});

const upload = multer({
  storage,
});

module.exports = upload;