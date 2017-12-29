import { liveQuerySelectorAll } from "../common";

// Expand task descriptions automatically
liveQuerySelectorAll(document, ".description-content-fade-button", el => {
  el.click();
});
