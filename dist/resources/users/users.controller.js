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
            const { password } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            req.body.password = hash;
            try {
                const user = yield userModel.create(req.body);
                return res.status(201).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel.find();
                return res.status(200).json({ ok: true, data: users });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().min(8).required(),
            });
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).send({ ok: false, msg: error.details[0].message });
            console.log(req.session);
            let user = yield userModel.findOne({ email: req.body.email });
            if (!user)
                return res.status(400).send({
                    ok: false,
                    msg: "Invalid email",
                });
            const isMatch = yield bcrypt.compare(req.body.password, user.password);
            if (!isMatch)
                return res.status(400).send({ ok: false, msg: "Invalid password" });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            return res.json({ ok: true, data: { token, user } });
        });
    },
    addFav(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                fav: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).send({ ok: false, msg: error.details[0].message });
            const { id } = req.user;
            const { fav } = req.body;
            try {
                const user = yield userModel.findByIdAndUpdate(id, { $push: { favs: fav } }, { new: true });
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
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
    deleteFav(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const { fav } = req.body;
            try {
                const user = yield userModel.findByIdAndUpdate(id, { $pull: { favs: fav } }, { new: true });
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
    getFavs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            try {
                const user = yield userModel.findById(id);
                return res.status(200).json({ ok: true, data: user.favs });
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const { password } = req.body;
            if (password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                req.body.password = hash;
            }
            try {
                const user = yield userModel.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                return res.status(200).json({ ok: true, data: user });
            }
            catch (error) {
                return res.status(500).json({ ok: false, data: error });
            }
        });
    },
};
