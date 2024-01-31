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
                const updatedUser = yield userModel.findByIdAndUpdate(userId, { $push: Object.assign({ tasks: uuidv4() }, req.body) }, { new: true } // Pour obtenir le document mis à jour
                );
                res.status(201).json(updatedUser);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ ok: false, data: error });
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
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { userId, id } = req.body;
            // const user = await userModel.findById(userId);
            // const task = await taskModel.findByIdAndUpdate(id)
            // try {
            //     const task = await taskModel.findByIdAndUpdate(id, req.body, {
            //         new: true
            //     })
            // }
        });
    },
};
