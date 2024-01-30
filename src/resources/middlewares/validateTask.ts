const Joi = require("joi");

const validateUser = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    userId: Joi.string(),
    name: Joi.string().regex(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$")).max(16).required(),
	description: Joi.string().max(60),
	numberOfPomodoroSet: Joi.number().required(),
    numberOfPomodoroDone : Joi.number(),
	timeSpend: Joi.number(),
	taskDone: Joi.boolean().required(),
	creationDate: Joi.date().required(),
	displayTask: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

module.exports = { validateUser };
