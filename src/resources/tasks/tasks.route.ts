const express = require("express");
const { authentification } = require("../middlewares/authentification");
const { validateTask } = require("../middlewares/validateTask");
const {
  createTask,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
} = require("./tasks.controller");

const router = express.Router();

router
  .route("/")
  .get(authentification, getTasks)
  .post(authentification, validateTask, createTask)
  .put(authentification, updateTask);
router.route("/:id").delete(authentification, deleteTask);
router.route("/task").get(authentification, getTask);

module.exports = router;
