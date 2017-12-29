import React from 'react';
import { humanRatio, showOnlyMostReplied, getCommentsAmountToShow } from "../comments";

const h = React.createElement;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { maxCommentsRatio: this.props.initialMaxCommentsRatio };
    this._updateComments();
  }

  render() {
    return h("div", {}, [
      h("p", {},
        `Showing the ${humanRatio(this.state.maxCommentsRatio)}, and at least 
        ${this.props.minComments}, of the most replied comments 
        (${this.state.shownComments} of ${this.props.comments.length}).`
      ),
      h("input", {
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

  _updateComments() {
    const amount = getCommentsAmountToShow({
      comments: this.props.comments,
      min: this.props.minComments,
      maxRatio: this.state.maxCommentsRatio
    });
    showOnlyMostReplied({ comments: this.props.comments, amount });
    this.setState({ shownComments: amount });
  }
}