const joi = require('joi');
const registerSchema = joi.object ({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
}