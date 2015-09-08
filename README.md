### Install

1. &nbsp;
  ```
  $ npm i
  $ node_modules/.bin/webpack [-w]
  ```
2. Chrome → Extensions → Load unpacked extension (⌘R)

### TODO

**Google Calendar**

- Improve code structure
- `TODO`s in the code
- `Esc` to close the textarea when in edit mode
- `Esc` to close the bubble when not in edit mode
- `E` to edit
- Overflow only the `<textarea>` + render section

**UX distance**

- Include scrolling
- Score - Consider time between actions
- Score - Consider changing between action types
- Score - Make it logarithmic?

**Autocomplete**

- Position candidates close to the caret
- Don't autocomplete elements not "contenteditable"
- Throttle update of words in the page
- Don't show candidates if a not printable keystroke is hit
- Insert suggested text automatically (selected)
