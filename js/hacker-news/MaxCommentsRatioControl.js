import React from 'react';

const h = React.createElement;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { max: this.props.initialMax };
    props.onChange(this.state.max);
  }

  render() {
    return [
      h("p", { key: 1 },
        `Showing the ${(this.state.max * 100).toFixed(0)}% most replied comments 
        (${Math.ceil(this.state.max * this.props.total)} of ${this.props.total}).`
      ),
      h("input", {
        key: 2,
        type: "range", 
        min: 0, 
        max: 1,
        step: 0.05,
        value: this.state.max,
        onChange: event => {
          const max = event.target.value;
          this.setState({ max })
          this.props.onChange(max)
        }
      })
    ] ;
  }
}