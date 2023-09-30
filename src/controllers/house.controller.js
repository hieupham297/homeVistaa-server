const houseModel = require("../models/house.model");

const getAllHouses = async (req, res) => {
  try {
    const housesList = await houseModel.find({});
    res.send({ status: "Sucessful", data: housesList });
  } catch (error) {
    console.log(error);
  }
};

const houseDetail = async (req, res) => {
  try {
    const houseData = await houseModel.findOne({ slug: req.params.slug });
    res.send({ status: "done", data: houseData });
  } catch (error) {
    console.log(error);
  }
};

const play3DView = async (req, res) => {
  try {
    const houseView = await houseModel.findOne({ slug: req.params.slug });
    res.send({ status: "done", data: houseView });
  } catch (error) {
    console.log(error);
  }
};

const searchByName = async (req, res) => {
  try {
    const { slug } = req.query;

    const housesList = await houseModel.find({
      slug: { $regex: slug, $options: "i" },
    });

    res.send({ status: "Successful", data: housesList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal server error" });
  }
};

const sortByPrice = async (req, res) => {
  try {
    const { order } = req.query;
    let sortOrder = 1; // 1 cho tăng dần, -1 cho giảm dần

    if (order === "desc") {
      sortOrder = -1; // Sắp xếp giảm dần
    }

    const housesList = await houseModel.find({}).sort({ price: sortOrder });

    res.send({ status: "Successful", data: housesList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal server error" });
  }
};

const filterByArea = async (req, res) => {
  try {
    const { minArea, maxArea } = req.query;
    let housesList = await houseModel.find({});

    if (minArea) {
      housesList = housesList.filter(
        (house) => house.area >= parseInt(minArea)
      );
    }

    if (maxArea) {
      housesList = housesList.filter((house) => house.area < parseInt(maxArea));
    }

    res.send({ status: "Successful", data: housesList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal server error" });
  }
};

const filterByNumOfBedroom = async (req, res) => {
  try {
    const { numOfBedroom } = req.query;
    const housesList = await houseModel.find({
      numberOfBedroom: numOfBedroom,
    });

    res.send({ status: "Successful", data: housesList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal server error" });
  }
};

const filterByLocation = async (req, res) => {
  try {
    const { address } = req.query;

    const housesList = await houseModel.find({
      address: { $regex: address, $options: "i" },
    });

    res.send({ status: "Successful", data: housesList });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal server error" });
  }
};

module.exports = {
  getAllHouses,
  houseDetail,
  play3DView,
  searchByName,
  sortByPrice,
  filterByArea,
  filterByNumOfBedroom,
  filterByLocation,
};
