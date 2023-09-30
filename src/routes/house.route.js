const express = require("express");
const houseController = require("../controllers/house.controller");

const router = express.Router();

router.get("/getAllHouses", houseController.getAllHouses);
router.get("/house/:slug", houseController.houseDetail);
router.get("/house/:slug/playpage", houseController.play3DView);
router.get("/searchByName", houseController.searchByName);
router.get("/sortByPrice", houseController.sortByPrice);
router.get("/filterByArea", houseController.filterByArea);
router.get("/filterByNumOfBedroom", houseController.filterByNumOfBedroom);
router.get("/filterByLocation", houseController.filterByLocation);

module.exports = router;
