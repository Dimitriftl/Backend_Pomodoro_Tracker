const taskModel = require("./tasks.model");
const userModel = require("../users/users.model");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createTask(req: any, res: any) {
    const { userId } = req.body;

    try {
      const createUser = await userModel.findByIdAndUpdate(
        userId,
        { $push: { tasks: { ...req.body } } },
        { new: true } // Pour obtenir le document mis à jour
      );
      res.status(201).json(createUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getTasks(req: any, res: any) {
    const { id } = req.user;

    try {
      const user = await userModel.findById(id);
      return res.status(200).json({ ok: true, data: user.tasks });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getTask(req: any, res: any) {
    const { _id } = req.body;
    const { id } = req.user;

    try {
      const user = await userModel.findById(id);
      const task = user.tasks.find((task: any) => task._id == _id);
      return res.status(200).json({ ok: true, data: task });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async updateTask(req: any, res: any) {
    // validateTask middleware will validate the body of the request
    const { _id } = req.body;
    const { id } = req.user;
    try {
      const updatedTask = await userModel.findOneAndUpdate(
        // filter all tasks of the user with the id and the task ID
        { _id: id, "tasks._id": _id },

        // update the task with the new data
        // .$ is the positional operator, it will update the first element that matches the query
        { $set: { "tasks.$": req.body } },

        // return the updated document
        { new: true }
      );
      console.log("user model => ", updatedTask);
      res.status(200).json({ ok: true, message: "task updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la mise à jour de la tâche.");
    }
  },

  async deleteTask(req: any, res: any) {
    const { _id } = req.body;
    const { id } = req.user;

    try {
      const deleted = await userModel.findOneAndUpdate(
        // filter all tasks of the user with the id and the task ID
        { _id: id, "tasks._id": _id },

        // update the task with the new data
        // .$ is the positional operator, it will update the first element that matches the query
        { $set: { "tasks.$.status": "deleted" } },

        // return the updated document
        { new: true }
      );
      console.log("updatedUser => ", deleted);
      res.status(200).json({ ok: true, message: "task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la suppression de la tâche.");
    }
  },
};
