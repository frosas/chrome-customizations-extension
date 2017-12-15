import React from "react";
import ReactDOM from "react-dom";
import MaxCommentsRatioControl from "./MaxCommentsRatioControl";

const h = React.createElement;

export default class UI {
  constructor({ maxCommentsRatio, totalComments, onChangeMaxComments }) {
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