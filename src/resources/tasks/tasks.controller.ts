const userModel = require("../users/users.model");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createTask(req: any, res: any) {
    const { id } = req.user;

    try {
      const task = await userModel.findByIdAndUpdate(
        id,
        { $push: { tasks: { ...req.body } } },
        { new: true } // Pour obtenir le document mis à jour
      );
      res.status(201).json(task.tasks[task.tasks.length - 1]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getTasks(req: any, res: any) {
    const { id } = req.user;

    try {
      const user = await userModel.findById(id);
      return res.status(200).json({
        ok: true,
        data: user.tasks.filter((task: any) => task.status !== "deleted"),
      });
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
      const taskUpdated = updatedTask.tasks.find(
        (task: any) => task._id == _id
      );
      res.status(200).json({
        ok: true,
        message: "task updated successfully",
        data: taskUpdated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la mise à jour de la tâche.");
    }
  },

  async updateNumberOfPomodoroAndTimeSpend(req: any, res: any) {
    const { _id, numberOfPomodoroDone, timeSpend } = req.body;
    const { id } = req.user;

    try {
      const taskToUpdate = await userModel.findOneAndUpdate(
        // filter all tasks of the user with the id and the task ID
        { _id: id, "tasks._id": _id },

        // update the task with the new data
        // .$ is the positional operator, it will update the first element that matches the query
        {
          $set: {
            "tasks.$.numberOfPomodoroDone": numberOfPomodoroDone,
            "tasks.$.timeSpend": timeSpend,
          },
        },

        // return the updated document
        { new: true }
      );

      const taskUpdated = taskToUpdate.tasks.find(
        (task: any) => task._id == _id
      );
      res.status(200).json({
        ok: true,
        message: "number of pomodoro done updated successfully",
        data: taskUpdated,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Something went wront on number pomodoro done update.");
    }
  },

  async updateTimeSpend(req: any, res: any) {
    const { _id, timeSpend } = req.body;
    const { id } = req.user;

    try {
      const taskToUpdate = await userModel.findOneAndUpdate(
        // filter all tasks of the user with the id and the task ID
        { _id: id, "tasks._id": _id },

        // update the task with the new data
        // .$ is the positional operator, it will update the first element that matches the query
        { $set: { "tasks.$.timeSpend": timeSpend } },

        // return the updated document
        { new: true }
      );

      const taskUpdated = taskToUpdate.tasks.find(
        (task: any) => task._id == _id
      );
      res.status(200).json({
        ok: true,
        message: "time spend updated successfully",
        data: taskUpdated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wront on time spend update.");
    }
  },

  async deleteTask(req: any, res: any) {
    const _id = req.params.id;
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
  async gaveUpTask(req: any, res: any) {
    const _id = req.body._id;
    const { id } = req.user;

    try {
      const gaveUp = await userModel.findOneAndUpdate(
        // filter all tasks of the user with the id and the task ID
        { _id: id, "tasks._id": _id },

        // update the task with the new data
        // .$ is the positional operator, it will update the first element that matches the query
        { $set: { "tasks.$.status": "gaveUp" } },

        // return the updated document
        { new: true }
      );
      console.log("updatedUser => ", gaveUp);
      res.status(200).json({ ok: true, message: "task gave up successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de l'abandon de la tâche.");
    }
  },
};
