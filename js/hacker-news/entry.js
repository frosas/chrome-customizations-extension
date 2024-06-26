// Shows only the most replied comments in https://news.ycombinator.com post and
// comment pages.

import { createElement as h } from "react"
import ReactDOM from "react-dom"
import { getComments } from "./comments.js"
import Main from "./ui/Main.js"
import "./format-blockquotes.js"

const comments = getComments()

// Don't show the UI if the page has no comments (e.g. the homepage)
if (comments.length) {
  const el = document.createElement("div")
  el.className = "chrome-customizations-extension-controls"
  document.body.appendChild(el)
  ReactDOM.render(
    h(Main, {
      comments,
      minComments: 5,
      initialMaxCommentsRatio: 0.1,
    }),
    el,
  )
}
