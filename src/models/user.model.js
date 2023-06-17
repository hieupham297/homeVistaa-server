const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedAt: {  
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

mongoose.model("User", userSchema);
