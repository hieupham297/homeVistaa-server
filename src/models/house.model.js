const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      require: true,
    },
    status: {
      type: String,
      maxlength: 255,
      require: true,
    },
    area: {
      type: String,
      maxlength: 10,
      require: true,
    },
    address: {
      type: String,
      maxlength: 255,
      require: true,
    },
    typeOfHouse: {
      type: String,
      maxlength: 255,
      require: true,
    },
    numberOfBedroom: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      maxlength: 600,
      require: true,
    },
    slug: {
      type: String,
      maxlength: 60,
      require: true,
      unique: true,
    }
  },
  {
    collection: "houses",
  }
);

mongoose.model("House", HouseSchema);
