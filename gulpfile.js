const { dest, src, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function gulpTask() {
  return src("./scss/**/*.scss").pipe(sass()).pipe(dest("./css"));
}

function watching() {
  watch("scss/**/*.scss", gulpTask);
}

module.exports.default = series(gulpTask, watching);
