import { waitForElement } from "../common.js";

(async () => {
  (await waitForElement("paper-button#more")).click();
})();
