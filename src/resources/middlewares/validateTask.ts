const Joi = require("joi");

const validateTask = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().max(30).required(),
    description: Joi.string().max(120),
    numberOfPomodoroSet: Joi.number().required(),
    numberOfPomodoroDone: Joi.number(),
    timeSpend: Joi.number(),
    taskDone: Joi.boolean().required(),
    displayTask: Joi.boolean().required(),
    
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }
  next();
};

module.exports = { validateTask };
