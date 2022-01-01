const { dest, src, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

function gulpTask() {
  return src("./scss/**/*.scss")
    .pipe(sass())
    .pipe(purgecss({ content: ["./views/index.ejs"] }))
    .pipe(dest("./static/css"));
}

function watching() {
  watch("scss/**/*.scss", gulpTask);
}

module.exports.default = series(gulpTask, watching);
