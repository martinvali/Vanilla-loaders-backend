require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors({ origin: "https://vanilla-loaders.netlify.app" }));
mongoose.connect(
  `mongodb+srv://martinv:${process.env.DB_PASSWORD}@cluster0.qdaga.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const loaderSchema = new mongoose.Schema({
  html: String,
  css: String,
});

const Loader = mongoose.model("vanillaloader", loaderSchema);

app.get("/", async (req, res) => {
  const allLoaders = await Loader.find({});
  res.json(allLoaders);
});

app.get("/loaders/:id", async function (req, res) {
  const { id } = req.params;
  const loader = await Loader.findById({ id: mongoose.Types.ObjectId(id) });
  console.log(loader);
  res.render("index", { loader });
});

app.listen(process.env.PORT || 8888, function () {
  console.log("listening on port 3000");
});
