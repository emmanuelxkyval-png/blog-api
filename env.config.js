require('dotenv').config();
const Joi = require('joi');

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
};