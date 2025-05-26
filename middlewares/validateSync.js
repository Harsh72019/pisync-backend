// middlewares/validateSync.js
const Joi = require("joi");

const syncSchema = Joi.object({
  deviceId: Joi.string().required(),
  timestamp: Joi.date().required(),
  totalFilesSynced: Joi.number().integer().min(0).required(),
  totalErrors: Joi.number().integer().min(0).required(),
  internetSpeed: Joi.number().min(0).required(),
});

module.exports = (req, res, next) => {
  const { error } = syncSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
