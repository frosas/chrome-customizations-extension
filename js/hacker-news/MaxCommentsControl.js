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
        `Showing the ${this.state.max} most replied comments from ${this.props.total}.`
      ),
      h("input", {
        key: 2,
        type: "range", 
        min: 0, 
        max: this.props.total,
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