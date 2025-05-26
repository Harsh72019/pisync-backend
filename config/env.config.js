const Joi = require("joi");
const path = require("path");
const dotnev = require("dotenv");

dotnev.config({ path: path.join(__dirname, "../.env") });

// schema of env files for validation
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(5000),
    MONGO_URI: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_URL: Joi.string().required(),
  })
  .unknown();

// validating the process.env object that contains all the env variables
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

// throw error if the validation fails or results into false
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT ,
    mongoUri: envVars.MONGO_URI,
    redisHost: envVars.REDIS_HOST,
    redisPort: envVars.REDIS_PORT,
    redisUrl: envVars.REDIS_URL,
};
