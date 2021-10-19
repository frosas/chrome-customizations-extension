const INDENT_WIDTH = 12; // TODO Detect it automatically?

export default class {
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
    this.children.forEach((child) => child.visit(callback));
  }

  get isComment() {
    return this.domNode; // All nodes but the root are comments
  }

  get domNodeIndent() {
    return (
      this.domNode &&
      this.domNode.querySelector(".ind img").width / INDENT_WIDTH
    );
  }
}
