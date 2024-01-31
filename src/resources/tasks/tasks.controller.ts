const taskModel = require("./tasks.model");
const userModel = require("../users/users.model");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createTask(req: any, res: any) {
    const { userId } = req.body;

    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $push: { tasks: { id: uuidv4(), ...req.body } } },
        { new: true } // Pour obtenir le document mis à jour
      );
      res.status(201).json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async updateTask(req: any, res: any) {
    const { taskId } = req.body;
    const { id } = req.user;

    try {
      const updatedTask = await userModel.findByIdAndUpdate(
        { id, "tasks.id": taskId },
        { $set: { "tasks.$": req.body } },
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la mise à jour de la tâche.");
    }
  },

  async getTasks(req: any, res: any) {
    const { userId } = req.body;

    try {
      const user = await userModel.findById(userId);
      return res.status(200).json({ ok: true, data: user.tasks });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },
};
