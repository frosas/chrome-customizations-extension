const { promisify } = require("util");
const glob = require("glob");
const { basename } = require("path");

module.exports = async () => ({
  entry: (await promisify(glob)("./js/entries/*.js"))
    .reduce((entries, file) => ({...entries, [basename(file, ".js")]: file}), {}),
  output: {
    filename: "dist/scripts/[name].js"
  }
});