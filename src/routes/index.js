const express = require("express");
const userRoute = require("./user.route.js");
const houseRoute = require("./house.route.js");

const router = express.Router();

router.use("/user", userRoute);
router.use("/house", houseRoute);

module.exports = router;
