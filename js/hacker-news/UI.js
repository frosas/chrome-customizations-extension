import React from "react";
import ReactDOM from "react-dom";
import MaxCommentsRatioControl from "./ui/MaxCommentsRatioControl";

const h = React.createElement;

export default class UI {
  constructor({ maxCommentsRatio, totalComments, onChangeMaxComments }) {
    // Don't show anything if there are no comments (e.g. in the homepage)
    if (!totalComments) return;

    ReactDOM.render(
      h("div", {},
        h(MaxCommentsRatioControl, {
          initialMax: maxCommentsRatio,
          total: totalComments,
          onChange: onChangeMaxComments
        })
      ),
      this._createElement()
    );  
  }

  _createElement() {
    const el = document.createElement('div');
    el.className = 'chrome-customizations-extension-controls';
    document.body.appendChild(el);
    return el;
  }
}