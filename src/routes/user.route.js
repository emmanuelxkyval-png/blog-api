const express = require("express");

const multer = require('multer');
const { 
  validateRegister, 
  validateLogin 
} = require("../validations/user.validdations.js");

const {
  registerUser,
  loginUser,
} = require('../controllers/user.controller.js');

const router = express.Router();

const upload = multer ({dest: 'uploads/', limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/upload', upload.single('image'), (req, res) => {
  const fileUrl = req.file.path;
  const fileName = req.file.filename;

  console.log(fileName);
  console.log(fileUrl);

  res.send('Hello, from upload');
});

router.post('/signup', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;