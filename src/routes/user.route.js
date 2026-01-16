const express = require("express");

const { 
  validateRegister, 
  validateLogin 
} = require("../validations/user.validations.js");

const {
  registerUser,
  loginUser,
} = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/signup', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);


module.exports = router;