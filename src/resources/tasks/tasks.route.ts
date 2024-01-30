const express = require("express");
const { authentification } = require("../middlewares/authentification");
const { validateTask } = require("../middlewares/validateTask");
const { createTask, getTasks, updateTask } = require("./tasks.controller");

const router = express.Router();

router
  .route("/")
  .post(validateTask, authentification, createTask)
  .get(authentification, getTasks)
  .put(authentification, updateTask);
