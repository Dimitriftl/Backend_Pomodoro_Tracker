"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { validateUser, validateUserUpdatePassword, validateUserUpdateInformations, } = require("../middlewares/validateUser");
const { signUp, logIn, deleteUser, getUser, updateUserPassword, updateUserTimeSpend, updateUserInformations, uploadUserPicture, } = require("./users.controller");
const { authentification } = require("../middlewares/authentification");
const upload = require("../middlewares/mutlerMiddleware");
const router = express.Router();
// // middleware validate user
router.route("/signup").post(validateUser, signUp);
router.route("/login").post(logIn);
router.route("/").get((req, res) => {
    res.send("Hello World!");
}); // test route
router
    .route("/user")
    .delete(authentification, deleteUser)
    .get(authentification, getUser)
    .put(authentification, validateUserUpdateInformations, updateUserInformations);
router
    .route("/upload")
    .post(authentification, upload.single("profilePicture"), uploadUserPicture);
router
    .route("/user/updatepassword")
    .put(authentification, validateUserUpdatePassword, updateUserPassword);
router.route("/user/timespend").put(authentification, updateUserTimeSpend);
module.exports = router;
