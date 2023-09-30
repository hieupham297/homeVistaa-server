const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./src/routes/index");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://homevista:homevista@home-vista.ppd87sf.mongodb.net/home-vista?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () => {
      console.log("Server is listening on http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
