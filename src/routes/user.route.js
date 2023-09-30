const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/userData/:token", userController.getInfo);
router.post("/logout", userController.logout);

module.exports = router;
