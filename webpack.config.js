import { promisify } from "util"
import glob from "glob"
import { basename, dirname } from "path"

export default async () => ({
  entry: (await promisify(glob)("./js/**/entry.js")).reduce((entries, file) => {
    const name = basename(dirname(file)) // Use the parent dir name
    return { ...entries, [name]: file }
  }, {}),
  output: { filename: "scripts/[name].js" },
})
