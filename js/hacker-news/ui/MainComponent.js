import { createElement as h, Component } from "react";
import { showOnlyMostReplied, getCommentsAmountToShow } from "../comments";
import LegendComponent from "./LegendComponent";
import MaxCommentsRatioControl from "./MaxCommentsRatioControl";

export default class extends Component {
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
        shownComments: this._shownComments
      }),
      h(MaxCommentsRatioControl, {
        ratio: this.state.maxCommentsRatio,
        onChange: ratio => this.setState({ maxCommentsRatio: ratio })
      })
    ]);
  }

  componentDidUpdate() {
    this._updateComments();
  }

  _updateComments() {
    showOnlyMostReplied({
      comments: this.props.comments,
      amount: this._shownComments
    });
  }

  get _shownComments() {
    return getCommentsAmountToShow({
      total: this.props.comments.length,
      min: this.props.minComments,
      maxRatio: this.state.maxCommentsRatio
    });
  }
}
