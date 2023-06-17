const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
require("./src/models/user.model");
const User = mongoose.model("User");
const houseSchema = new mongoose.Schema({});
const House = mongoose.model("House", houseSchema);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("console");

const JWT_SECRET = crypto.randomBytes(32).toString("hex");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(
    "mongodb+srv://homevista:homevista@home-vista.ppd87sf.mongodb.net/home-vista?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
    server.listen(port, () => {
      console.log("Server is listening on http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

// signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(username, email, password);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "oke" });
  } catch (error) {
    console.log(error);
    res.send({ status: "no" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  console.log(password, user.password);
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/getAllHouses", async (req, res) => {
  try {
    const housesList = await House.find({});
    res.send({ status: "done", data: housesList });
  } catch (error) {
    console.log(error);
  }
});

app.get("/house/:slug", async (req, res) => {
  try {
    const houseData = await House.findOne({ slug: req.params.slug });
    res.send({ status: "done", data: houseData });
  } catch (error) {
    console.log(error);
  }
});

app.get("/house/:slug/playpage", async (req, res) => {
  try {
    const houseModel = await House.findOne({ slug: req.params.slug });
    res.send({ status: "done", data: houseModel });
  } catch (error) {
    console.log(error);
  }
});
