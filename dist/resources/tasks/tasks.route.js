"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { authentification } = require("../middlewares/authentification");
const { validateTask } = require("../middlewares/validateTask");
const { createTask, getTasks, updateTask } = require("./tasks.controller");
const router = express.Router();
router
    .route("/")
    .get(authentification, getTasks)
    .post(authentification, validateTask, createTask)
    .put(authentification, updateTask);
module.exports = router;
