import React from 'react';
import { humanRatio, showOnlyMostReplied, getMaxCommentsToShow } from "../comments";

const h = React.createElement;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { maxCommentsRatio: this.props.initialMaxCommentsRatio };
    this._updateComments();
  }

  render() {
    return h("div", {}, [
      h("p", { key: 1 },
        `Showing the ${humanRatio(this.state.maxCommentsRatio)}, and at least 
        ${this.props.minComments}, of the most replied comments 
        (${this._shownComments} of ${this.props.comments.length}).`
      ),
      h("input", {
        key: 2,
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
        value: this.state.maxCommentsRatio,
        onChange: event => this.setState({ maxCommentsRatio: event.target.value })
      })
    ]);
  }

  componentDidUpdate() {
    this._updateComments();
  }

  get _shownComments() {
    return getMaxCommentsToShow({
      comments: this.props.comments,
      min: this.props.minComments,
      maxRatio: this.state.maxCommentsRatio
    });
  }

  _updateComments() {
    showOnlyMostReplied({
      comments: this.props.comments,
      min: this.props.minComments,
      maxRatio: this.state.maxCommentsRatio
    });
  }
}