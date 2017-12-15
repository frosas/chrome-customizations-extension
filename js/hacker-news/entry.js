// Shows only the most replied comments in https://news.ycombinator.com post and
// comment pages.

import UI from "./UI";
import { showOnlyMostReplied, getComments } from "./comments";

const comments = getComments();

new UI({
  maxCommentsRatio: 0.05,
  totalComments: comments.length,
  onChangeMaxComments: maxRatio => showOnlyMostReplied({ comments, maxRatio })
});