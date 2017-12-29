// Shows only the most replied comments in https://news.ycombinator.com post and
// comment pages.

import UI from "./UI";
import { showOnlyMostReplied, getComments, getMaxCommentsToShow } from "./comments";

const comments = getComments();

// Don't show the UI if the page has no comments (e.g. the homepage)
if (comments.length) {
  new UI({
    maxCommentsRatio: 0.05,
    totalComments: comments.length,
    onChangeMaxComments: maxRatio => showOnlyMostReplied({ comments, maxRatio })
  });
}