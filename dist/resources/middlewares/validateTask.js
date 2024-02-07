"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validateTask = (req, res, next) => {
    const schema = Joi.object({
        taskName: Joi.string().max(40).required(),
        description: Joi.string().max(200),
        numberOfPomodoroSet: Joi.number().required(),
        numberOfPomodoroDone: Joi.number(),
        timeSpend: Joi.number(),
        taskDone: Joi.boolean(),
        displayTask: Joi.boolean(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, error: error.details[0].message });
    }
    next();
};
module.exports = { validateTask };
