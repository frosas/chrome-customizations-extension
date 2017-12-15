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

export const getComments = () => {
  const comments = [];
  getCommentsTree().visit(node => node.isComment && comments.push(node));
  return comments;
}

export const showOnlyMostReplied = ({ maxRatio }) => {
  const comments = getComments();
  const max = Math.ceil(maxRatio * comments.length);
  comments
    .sort((comment1, comment2) => comment2.children.length - comment1.children.length)
    .forEach((comment, i) => {
      const show = i <= max - 1;
      comment.domNode.querySelector('.comment').style.display = show ? 'block' : 'none';        
    });
};

/**
 * @param {number} ratio Comments ratio (from 0 to 1).
 * @returns {number} The human representation (a percentage) of the ratio.
 */
export const humanRatio = ratio => `${Math.ceil(ratio * 100)}%`;