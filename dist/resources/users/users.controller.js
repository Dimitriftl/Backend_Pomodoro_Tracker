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
const userModel = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
module.exports = {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email } = req.body;
            const userExist = yield userModel.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({
                    ok: false,
                    error: "This email adress is already taken",
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            req.body.password = hash;
            try {
                // create a user in the database with user model
                const user = yield userModel.create(req.body);
                return res.status(201).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // joi allows to validate the data that we receive in the body of a request and if it's not valid it will send an error
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().min(8).required(),
            });
            // validate the data that we receive in the body of a request
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).send({ ok: false, msg: error.details[0].message });
            // check if the user exists in the database
            let user = yield userModel.findOne({ email: req.body.email });
            if (!user)
                return res.status(400).send({
                    ok: false,
                    msg: "Invalid email",
                });
            // check if the password is correct with bcrypt wich is the labrary we used to hash the password
            const isMatch = yield bcrypt.compare(req.body.password, user.password);
            if (!isMatch)
                return res.status(400).send({ ok: false, msg: "Invalid password" });
            // create a token with jwt wich is the library we used to create the token and we pass the id of the user and the secret key that we have in the .env file and we set the expiration time to 1 day and we send the token and the user in the response
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            const data = {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    totalTimeSpend: user.totalTimeSpend,
                    profilePicture: user.profilePicture,
                },
                tasks: user.tasks.filter((task) => task.status !== "deleted"),
            };
            return res.json({ ok: true, token, data });
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            try {
                const user = yield userModel.findByIdAndDelete(id);
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            try {
                const user = yield userModel.findById(id);
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    updateUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            let { currentPassword, newPassword } = req.body;
            let user = yield userModel.findById(id);
            const isMatch = yield bcrypt.compare(currentPassword, user.password);
            const isEqualToPreviousPassword = yield bcrypt.compare(newPassword, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ ok: false, error: "current password is incorrect." });
            }
            else if (isEqualToPreviousPassword) {
                return res.status(400).json({
                    ok: false,
                    error: "Your new password can't be the same as the current one.",
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            newPassword = hash;
            try {
                // new: true allows to return the updated user otherwise it will return the user before the update
                const user = yield userModel.findByIdAndUpdate(id, { $set: { password: newPassword } }, { new: true });
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, error: error });
            }
        });
    },
    updateUserInformations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const data = req.body;
            try {
                // new: true allows to return the updated user otherwise it will return the user before the update
                const user = yield userModel.findByIdAndUpdate(id, data, {
                    new: true,
                });
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, error: error });
            }
        });
    },
    updateUserTimeSpend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const { timeSpend } = req.body;
            try {
                const user = yield userModel.findByIdAndUpdate(id, { $inc: { totalTimeSpend: timeSpend } }, { new: true });
                return res
                    .status(200)
                    .json({ ok: true, data: { totalTimeSpend: user.totalTimeSpend } });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    uploadUserPicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const { filename } = req.file;
            try {
                const user = yield userModel.findByIdAndUpdate(id, { $set: { profilePicture: filename } }, { new: true });
                return res
                    .status(200)
                    .json({ ok: true, data: { profilePicture: user.profilePicture } });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
};
