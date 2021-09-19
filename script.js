require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "https://vanilla-loaders.netlify.app/" }));
mongoose.connect(
  `mongodb+srv://martinv:${process.env.DB_PASSWORD}@cluster0.qdaga.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const loaderSchema = new mongoose.Schema({
  html: String,
  css: String,
});

const Loader = mongoose.model("vanillaloader", loaderSchema);

app.get("/", async (req, res) => {
  const allLoaders = await Loader.create({ html: "test", css: "test" });
  res.json(allLoaders);
});

app.listen(process.env.PORT || 8888, function () {
  console.log("listening on port 3000");
});
