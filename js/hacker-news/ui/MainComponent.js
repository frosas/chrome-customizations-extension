import { createElement as h, PureComponent } from "react";
import { showOnlyMostReplied, getCommentsAmountToShow } from "../comments";
import LegendComponent from "./LegendComponent";
import MaxCommentsRatioControl from "./MaxCommentsRatioControl";

export default class extends PureComponent {
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
      h(MaxCommentsRatioControl, {
        maxCommentsRatio: this.state.maxCommentsRatio,
        onChange: ratio => this.setState({ maxCommentsRatio: ratio })
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