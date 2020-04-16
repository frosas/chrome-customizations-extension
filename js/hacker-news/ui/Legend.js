import { createElement as h } from "react";
import { humanRatio } from "../comments";

export default (props) => {
  return h(
    "p",
    {},
    `Showing the ${humanRatio(props.maxCommentsRatio)} (and at least 
    ${props.minComments}) of the most replied comments (${props.shownComments} 
    of ${props.totalComments}).`
  );
};
