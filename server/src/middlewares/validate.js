import Joi from "joi";

const numerSchema = Joi.object({
  from: Joi.string()
    .pattern(/^\+[1-9]\d{7,14}$/)
    .required()
    .messages({
      "string.pattern.base": "From number must be in E.164 format (e.g. +919876543210)"
    }),

  to: Joi.string()
    .pattern(/^\+[1-9]\d{7,14}$/)
    .required()
    .messages({
      "string.pattern.base": "To number must be in E.164 format (e.g. +919876543210)"
    }),

  context: Joi.string().min(3).max(2000).required(),

  mode: Joi.string()
    .valid("one-way", "shared")
    .required(),

  location: Joi.string().min(2).max(100)

});

const validateNumer = (req, res, next) => {
  const { error } = numerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  if (req.body.from === req.body.to) {
    return res.status(400).json({
      success: false,
      message: "From and To numbers cannot be identical."
    });
  }

  next();
};

export default validateNumer;
