const usersRoute = require("../resources/users/users.route");
const tasksRoute = require("../resources/tasks/tasks.route");
const express = require("express");
const cors = require("cors");

const initializeRoutes = (app: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/users", usersRoute);
  app.use("/api/tasks", tasksRoute);
};

module.exports = { initializeRoutes };
