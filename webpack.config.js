/* eslint-env node */

const { promisify } = require("util");
const glob = require("glob");
const { basename, dirname } = require("path");
const { DefinePlugin } = require("webpack");

module.exports = async () => ({
  entry: (await promisify(glob)("./js/**/entry.js")).reduce((entries, file) => {
    const name = basename(dirname(file)); // Use the parent dir name
    return { ...entries, [name]: file };
  }, {}),
  output: { filename: "dist/scripts/[name].js" },
  plugins: [
    // For React
    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
  ]
});
