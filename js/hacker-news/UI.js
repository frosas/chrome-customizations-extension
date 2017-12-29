import React from "react";
import ReactDOM from "react-dom";
import MaxCommentsRatioControl from "./ui/MaxCommentsRatioControl";
import { showOnlyMostReplied } from "./comments";

const h = React.createElement;

export default class UI {
  constructor({ comments, maxCommentsRatio }) {
    ReactDOM.render(
      h("div", {},
        h(MaxCommentsRatioControl, {
          initialMax: maxCommentsRatio,
          total: comments.length,
          onChange: maxRatio => showOnlyMostReplied({ comments, maxRatio })
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