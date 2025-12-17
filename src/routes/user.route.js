const express = require("express");
const {
  registerUser,
  loginUser,
} = require('../controllers/user.controller.js');
const { validateRegister, validateLogin } = require("../validations/user.validdations.js");

const router = express.Router();

router.post('/signup', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;