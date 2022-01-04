require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors({ origin: "https://vanilla-loaders.netlify.app" }));
app.use(express.static(__dirname + "/static"));
mongoose.connect(
  `mongodb+srv://martinv:${process.env.DB_PASSWORD}@cluster0.qdaga.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const loaderSchema = new mongoose.Schema({
  html: String,
  css: String,
  type: String,
});

const Loader = mongoose.model("vanillaloader", loaderSchema);

app.get("/", async (req, res) => {
  const allLoaders = await Loader.find({});
  res.json(allLoaders);
});

app.get("/loaders/:id", async function (req, res) {
  const { id } = req.params;
  const loader = await Loader.findById({ _id: id });
  fs.copyFileSync("./static/css/index.css", "./static/css/loaderServed.css");
  fs.appendFileSync("./static/css/loaderServed.css", loader.css, { flag: "a" });
  res.render("index", { loader });
});

app.get("/loaders", async function (req, res) {
  let type = req.query.type;
  if (type === "all") {
    const loaders = await Loader.find({});
    return res.json(loaders);
  }
  const loaders = await Loader.find({ type });
  res.json(loaders);
});

app.listen(process.env.PORT || 8888, function () {
  console.log("listening on port 3000");
});
