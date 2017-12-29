import React from "react";
import ReactDOM from "react-dom";
import MainComponent from "./ui/MainComponent";

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
      h(MainComponent, {
        comments: this._comments,
        initialMaxCommentsRatio: this._maxCommentsRatio
      }),
      this._element
    );  
  }
}