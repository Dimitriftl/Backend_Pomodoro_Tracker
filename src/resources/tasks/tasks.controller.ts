const taskModel = require("./tasks.model");
const Joi = require("joi");

module.exports = {
  async getTasks(req: any, res: any) {
    const { id } = req.user;

    try {
      const user = await taskModel.findById(id);
      return res.status(200).json({ ok: true, data: user.tasks });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },
};
