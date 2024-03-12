"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoute = require("../resources/users/users.route");
const tasksRoute = require("../resources/tasks/tasks.route");
const express = require("express");
const cors = require("cors");
const initializeRoutes = (app) => {
    app.use(cors()); // use to prevent 500 errors due to different request sources
    app.use(express.json()); // parse the bodies of HTTP requests as JSON
    app.use(express.static("public")); // used to have access to the images folder in public
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/users", usersRoute);
    app.use("/api/tasks", tasksRoute);
};
module.exports = { initializeRoutes };
