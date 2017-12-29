import { createElement as h } from "react";

export default props => {
  return h("input", {
    type: "range",
    min: 0,
    max: 1,
    step: 0.05,
    value: props.maxCommentsRatio,
    onChange: event => props.onChange(event.target.value)
  });
};