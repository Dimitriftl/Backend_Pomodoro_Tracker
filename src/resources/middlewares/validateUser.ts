const Joi = require("joi");

const errorMessage = {
  "string.min": `Your password should have a minimum length of 8.`,
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

    confirmedPassword: Joi.string(),
    role: Joi.string().valid("admin", "user").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

const validateUserUpdatePassword = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    currentPassword: Joi.string()
      .regex(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:"<>?/]).{8,}$'
        )
      )
      .required(),

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

module.exports = { validateUser, validateUserUpdatePassword };
