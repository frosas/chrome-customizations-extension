import React from 'react';
import { humanRatio } from "../comments";

const h = React.createElement;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { maxCommentsRatio: this.props.initialMaxCommentsRatio };
    props.onChangeMaxCommentsRatio(this.state.maxCommentsRatio);
  }

  render() {
    return h("div", {}, [
      h("p", { key: 1 },
        `Showing the ${humanRatio(this.state.maxCommentsRatio)} most replied comments 
        (${this.props.shownComments} of ${this.props.totalComments}).`
      ),
      h("input", {
        key: 2,
        type: "range", 
        min: 0, 
        max: 1,
        step: 0.05,
        value: this.state.maxCommentsRatio,
        onChange: event => {
          const ratio = event.target.value;
          this.setState({ maxCommentsRatio: ratio });
          this.props.onChangeMaxCommentsRatio(ratio);
        }
      })
    ]);
  }
}