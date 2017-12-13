import React from "react";
import ReactDOM from "react-dom";
import MaxCommentsControl from "./MaxCommentsControl";

const h = React.createElement;

export default class UI {
  constructor({ maxComments, totalComments, onChangeMaxComments }) {
    ReactDOM.render(
      h("div", {},
        h(MaxCommentsControl, {
          initialMax: maxComments,
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