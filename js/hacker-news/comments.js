import CommentTreeNode from "./comments/TreeNode";

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

export const getCommentsAmountToShow = ({ total, min, maxRatio }) => {
  return Math.min(total, Math.max(min, ratioToAbsolute(maxRatio, total)));
};

export const showOnlyMostReplied = ({ comments, amount }) => {
  comments
    .sort((comment1, comment2) => comment2.children.length - comment1.children.length)
    .forEach((comment, i) => {
      const show = i <= amount - 1;
      comment.domNode.querySelector('.comment').style.display = show ? 'block' : 'none';        
    });
};

/**
 * @param {number} ratio Comments ratio (from 0 to 1).
 * @returns {number} The human representation (a percentage) of the ratio.
 */
export const humanRatio = ratio => `${Math.ceil(ratio * 100)}%`;

/**
 * @param {number} ratio Comments ratio.
 * @param {number} total Total of comments.
 * @returns {number} The absolute number of comments represented in the ratio.
 */
const ratioToAbsolute = (ratio, total) => Math.ceil(ratio * total);