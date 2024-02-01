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
            const { userId } = req.body;
            try {
                const createUser = yield userModel.findByIdAndUpdate(userId, { $push: { tasks: Object.assign({}, req.body) } }, { new: true } // Pour obtenir le document mis à jour
                );
                res.status(201).json(createUser);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.body;
            const { id } = req.user;
            try {
                // Rechercher l'utilisateur par son ID
                const user = yield userModel.findById(id);
                // Rechercher la tâche par son ID dans le tableau de tâches de l'utilisateur
                const taskToUpdate = user.tasks.id(taskId);
                // Mettre à jour les propriétés de la tâche
                taskToUpdate.name = req.body.name || taskToUpdate.name;
                taskToUpdate.description =
                    req.body.description || taskToUpdate.description;
                taskToUpdate.numberOfPomodoroSet =
                    req.body.numberOfPomodoroSet || taskToUpdate.numberOfPomodoroSet;
                taskToUpdate.taskDone = req.body.taskDone || taskToUpdate.taskDone;
                taskToUpdate.displayTask =
                    req.body.displayTask || taskToUpdate.displayTask;
                // Enregistrer les modifications dans la base de données
                yield user.save();
                res.status(200).json({ message: "Tâche mise à jour avec succès" });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "Erreur lors de la mise à jour de la tâche" });
            }
        });
    },
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const user = yield userModel.findById(userId);
                return res.status(200).json({ ok: true, data: user.tasks });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
};
