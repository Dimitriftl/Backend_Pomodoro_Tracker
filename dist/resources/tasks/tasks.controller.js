"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskModel = require("./tasks.model");
const userModel = require("../users/users.model");
const { v4: uuidv4 } = require("uuid");
module.exports = {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            try {
                const task = yield userModel.findByIdAndUpdate(id, { $push: { tasks: Object.assign({}, req.body) } }, { new: true } // Pour obtenir le document mis à jour
                );
                res.status(201).json(task.tasks[task.tasks.length - 1]);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            try {
                const user = yield userModel.findById(id);
                return res.status(200).json({
                    ok: true,
                    data: user.tasks.filter((task) => task.status !== "deleted"),
                });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.body;
            const { id } = req.user;
            try {
                const user = yield userModel.findById(id);
                const task = user.tasks.find((task) => task._id == _id);
                return res.status(200).json({ ok: true, data: task });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // validateTask middleware will validate the body of the request
            const { _id } = req.body;
            const { id } = req.user;
            try {
                const updatedTask = yield userModel.findOneAndUpdate(
                // filter all tasks of the user with the id and the task ID
                { _id: id, "tasks._id": _id }, 
                // update the task with the new data
                // .$ is the positional operator, it will update the first element that matches the query
                { $set: { "tasks.$": req.body } }, 
                // return the updated document
                { new: true });
                console.log("user model => ", updatedTask);
                res.status(200).json({ ok: true, message: "task updated successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Erreur lors de la mise à jour de la tâche.");
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.body;
            const { id } = req.user;
            try {
                const deleted = yield userModel.findOneAndUpdate(
                // filter all tasks of the user with the id and the task ID
                { _id: id, "tasks._id": _id }, 
                // update the task with the new data
                // .$ is the positional operator, it will update the first element that matches the query
                { $set: { "tasks.$.status": "deleted" } }, 
                // return the updated document
                { new: true });
                console.log("updatedUser => ", deleted);
                res.status(200).json({ ok: true, message: "task deleted successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Erreur lors de la suppression de la tâche.");
            }
        });
    },
};
