import React from 'react';
import ReactDOM from 'react-dom';

const h = React.createElement;

class MaxCommentsControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { max: this.props.initialMax };
    props.onChange(this.state.max);
  }

  render() {
    return h("div", {},
      h("p", {},
        `Showing the ${this.state.max} most replied comments from ${this.props.total}.`
      ),
      h("input", { 
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
    );
  }
}

export default class UI {
  constructor({ maxComments, totalComments, onChangeMaxComments }) {
    ReactDOM.render(
      h("div", {},
        h(MaxCommentsControl, {
          initialMax: maxComments,
          total: totalComments,
          onChange: onChangeMaxComments
        })
      ),
      this._createElement()
    );  
  }

  _createElement() {
    const el = document.createElement('div');
    el.className = 'chrome-customizations-extension-controls';
    document.body.appendChild(el);
    return el;
  }
}