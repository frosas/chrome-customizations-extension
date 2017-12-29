// Shows only the most replied comments in https://news.ycombinator.com post and
// comment pages.

import UI from "./UI";
import { getComments } from "./comments";

const comments = getComments();

// Don't show the UI if the page has no comments (e.g. the homepage)
if (comments.length) new UI({ comments, maxCommentsRatio: 0.05 });