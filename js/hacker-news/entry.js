// Shows only the most replied comments in https://news.ycombinator.com post and
// comment pages.

import React from 'react';
import ReactDOM from 'react-dom';

const INDENT_WIDTH = 12; // TODO Detect it automatically?

class CommentTreeNode {
  constructor(attrs) {
    this.children = [];
    Object.assign(this, attrs);
  }

  nest(node) {
    this.children.push(node);
    node.parent = this;
  }

  visit(callback) {
    callback(this);
    this.children.forEach(child => child.visit(callback));      
  }

  // All nodes are comments but the root
  get isComment() {
    return this.domNode;
  }

  get domNodeIndent() {
    return this.domNode && this.domNode.querySelector('.ind img').width / INDENT_WIDTH;
  }
}

const getCommentsTree = () => {
  const tree = new CommentTreeNode;
  let reference = tree;
  // Not sure why HN doesn't show some of the comments. E.g. 
  // https://news.ycombinator.com/item?id=15630646
  document.querySelectorAll('.comtr:not(.noshow)').forEach(domNode => {
    const node = new CommentTreeNode({ domNode });
    while (node.domNodeIndent <= reference.domNodeIndent) reference = reference.parent;
    reference.nest(node);
    reference = node;
  });
  return tree;
};

const getComments = () => {
  const comments = [];
  getCommentsTree().visit(node => node.isComment && comments.push(node));
  return comments;
}

const showOnlyMostRepliedComments = ({ max }) => {
  getComments()
    .sort((comment1, comment2) => comment2.children.length - comment1.children.length)
    .forEach((comment, i) => {
      const show = i <= max - 1;
      comment.domNode.querySelector('.comment').style.display = show ? 'block' : 'none';        
    });
};

//

const h = React.createElement;

export default class extends React.PureComponent {
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

const el = document.createElement('div');
el.className = 'chrome-customizations-extension-controls';
document.body.appendChild(el);

ReactDOM.render(
  h("div", {},
    h(MaxCommentsControl, {
      initialMax: 5,
      total: getComments().length,
      onChange: max => showOnlyMostRepliedComments({ max })
    })
  ),
  el
);