const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://martinv:pm1RUS67wvXV0Vmj@cluster0.qdaga.mongodb.net/Vanillaloaders?retryWrites=true&w=majority`
);

const loaderSchema = new mongoose.Schema({
  html: String,
  css: String,
});
const Loader = mongoose.model("vanillaloader", loaderSchema);

for (let i = 1; i <= 9; i++) {
  fs.readFile(
    `${path.resolve(__dirname, `../loaders/loader${i}.html`)}`,
    "utf8",
    function (err, data) {
      if (err) return console.error(err);
      //   console.log(data.split(/(?=<style>)/gi)[1].split(/(?=<\/head>)/gi)[0]); //<style></style>
      //  console.log(data.split(/(?=<body>)/gi)[1].split(/(?<=<\/body>)/gi)[0]); // <body>/body
      Loader.create({
        html: data.split(/(?=<body>)/gi)[1].split(/(?<=<\/body>)/gi)[0],
        css: data.split(/(?=<style>)/gi)[1].split(/(?=<\/head>)/gi)[0],
      });
    }
  );
}
