const UserModel = require('../models/user.model.js');
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {

  const registerSchema = joi.object ({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  });
  const {error} = registerSchema.validate(req.body)
  if(error){
    return res.status(400).json({message: error.details[0].message})
  }
  try {
  const {email, password, name} = req.body;

  const existingUser = await UserModel.findOne({email: email})

  if (existingUser){
    return res.status(400).json({message: "User already exists"})
  }

  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(password, salt);

  const user = new UserModel({
    email: email,
    password: hashed,
    name: name
  })

  await user.save();

  return res.status(200).json({
    message: "User registered successfully",
  });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = loginSchema.validate(req.body);
    if(error){
    return res.status(400).json({message: error.details[0].message});
  }
try {
  
  const {email, password} = req.body

  const user = await UserModel.findOne({email: email})

  if(!user){
    return res.status(404).json({message: "User does not exist"})
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid Credentials');

    console.log('VERIFY SECRET:', process.env.JWT_SECRET);

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const resUser = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  return res.status(200).json({message: "logged In", user, token});
} catch (error) {
  next(error);
}
};

module.exports = { loginUser, registerUser }