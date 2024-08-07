const Joi = require("joi");

const errorMessage = {
  "string.min": `Your password should have a minimum length of 8.`,
  "string.regex": `Your password must contain at least 1 majuscule, 1 number and 1 special character.`,
  "string.pattern.base": `Your password must contain at least 1 majuscule, 1 number and 1 special character.`,
};

const validateUser = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().regex(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$")).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:"<>?/]).{8,}$'
        )
      )
      .messages(errorMessage)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

const validateUserUpdatePassword = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(0).required(),

    newPassword: Joi.string()
      .min(8)
      .regex(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:"<>?/]).{8,}$'
        )
      )
      .messages(errorMessage)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

const validateUserUpdateInformations = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().regex(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$")),
    email: Joi.string().email(),
  }).messages({
    "string.pattern.base": `Your name can only have letters`,
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateUser,
  validateUserUpdatePassword,
  validateUserUpdateInformations,
};
