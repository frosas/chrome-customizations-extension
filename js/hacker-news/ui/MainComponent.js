import React from "react";
import { showOnlyMostReplied, getCommentsAmountToShow } from "../comments";
import LegendComponent from "./LegendComponent";

const h = React.createElement;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { maxCommentsRatio: this.props.initialMaxCommentsRatio };
    this._updateComments();
  }

  render() {
    return h("div", {}, [
      h(LegendComponent, {
        minComments: this.props.minComments,
        maxCommentsRatio: this.state.maxCommentsRatio,
        totalComments: this.props.comments.length,
        shownComments: this.state.shownComments
      }),
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