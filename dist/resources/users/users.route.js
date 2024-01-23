"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { validateUser } = require("../middlewares/validateUser");
const { signUp, getAllUsers, logIn, deleteUser, getUser, updateUser, } = require("./users.controller");
const { authentification } = require("../middlewares/authentification");
const router = express.Router();
// // middleware validate user
// router.route("").get(authentification, getAllUsers);
// router.route("/signup").post(validateUser, signUp);
// router.route("/login").post(logIn);
// router
//   .route("/user")
//   .delete(authentification, deleteUser)
//   .get(authentification, getUser)
//   .put(authentification, updateUser);
module.exports = router;
