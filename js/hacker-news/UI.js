import React from "react";
import ReactDOM from "react-dom";
import MaxCommentsRatioControl from "./ui/MaxCommentsRatioControl";
import { showOnlyMostReplied } from "./comments";

const h = React.createElement;

export default class UI {
  constructor({ comments, maxCommentsRatio }) {
    this._comments = comments;
    this._maxCommentsRatio = maxCommentsRatio;
    this._element = this._createElement();
    this._render();
  }

  _createElement() {
    const el = document.createElement('div');
    el.className = 'chrome-customizations-extension-controls';
    document.body.appendChild(el);
    return el;
  }

  _render() {
    ReactDOM.render(
      h("div", {},
        h(MaxCommentsRatioControl, {
          initialMax: this._maxCommentsRatio,
          total: this._comments.length,
          onChange: maxRatio => {
            showOnlyMostReplied({ comments: this._comments, maxRatio });
          }
        })
      ),
      this._element
    );  
  }
}