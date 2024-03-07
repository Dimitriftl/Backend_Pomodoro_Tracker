const express = require("express");
const {
  validateUser,
  validateUserUpdatePassword,
} = require("../middlewares/validateUser");
const {
  signUp,
  logIn,
  deleteUser,
  getUser,
  updateUserPassword,
  updateUserTimeSpend,
} = require("./users.controller");
const { authentification } = require("../middlewares/authentification");

const router = express.Router();

// // middleware validate user
router.route("/signup").post(validateUser, signUp);
router.route("/login").post(logIn);
router.route("/").get((req: any, res: any) => {
  res.send("Hello World!");
}); // test route
router
  .route("/user")
  .delete(authentification, deleteUser)
  .get(authentification, getUser)
  .put(authentification, updateUserPassword);

router
  .route("/user/updatepassword")
  .put(authentification, validateUserUpdatePassword, updateUserPassword);

router.route("/user/timespend").put(authentification, updateUserTimeSpend);
module.exports = router;
