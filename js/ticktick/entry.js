// Blur focus on pressing Escape. Meant to be used after editing a task content
// to return to the "view mode" (which makes links clickable, for example)
document.addEventListener(
  "keydown",
  ({ key }) => {
    if (key === "Escape") document.activeElement.blur();
  },
  true
);
