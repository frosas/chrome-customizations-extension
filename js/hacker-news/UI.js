import React from "react";
import ReactDOM from "react-dom";
import MainComponent from "./ui/MainComponent";
import { showOnlyMostReplied, getMaxCommentsToShow } from "./comments";

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
        initialMaxCommentsRatio: this._maxCommentsRatio,
        totalComments: this._comments.length,
        shownComments: getMaxCommentsToShow({
          comments: this._comments,
          maxRatio: this._maxCommentsRatio
        }),
        onChangeMaxCommentsRatio: ratio => {
          this._maxCommentsRatio = ratio;
          showOnlyMostReplied({
            comments: this._comments,
            maxRatio: this._maxCommentsRatio
          });
          this._render();
        }
      }),
      this._element
    );  
  }
}