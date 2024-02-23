const { promisify } = require("util")
const glob = require("glob")
const { basename, dirname } = require("path")

module.exports = async () => ({
  entry: (await promisify(glob)("./js/**/entry.js")).reduce((entries, file) => {
    const name = basename(dirname(file)) // Use the parent dir name
    return { ...entries, [name]: file }
  }, {}),
  output: { filename: "scripts/[name].js" },
})
