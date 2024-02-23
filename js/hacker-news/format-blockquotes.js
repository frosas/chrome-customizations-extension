// Fix first comments paragraph not being wrapped in a <p>
document.querySelectorAll(".commtext").forEach((el) => {
  const child = el.childNodes[0]
  if (child.nodeType === Node.TEXT_NODE) {
    const p = document.createElement("p")
    child.replaceWith(p)
    p.appendChild(child)
  }
})

Array.from(document.querySelectorAll(".commtext p"))
  .filter((p) => p.innerText.startsWith("> "))
  .forEach((p) => {
    const blockquote = document.createElement("blockquote")
    p.replaceWith(blockquote)
    blockquote.appendChild(p)
  })
