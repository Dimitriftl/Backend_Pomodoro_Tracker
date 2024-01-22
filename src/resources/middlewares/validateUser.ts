const Joi = require("joi");

const validateUser = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().regex(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$")).required(),
    surname: Joi.string()
      .regex(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$"))
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:"<>?/]).{8,}$'
        )
      )
      .required(),
    role: Joi.string().valid("admin", "user").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

module.exports = { validateUser };
