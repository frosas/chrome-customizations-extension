export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

export const waitFor = async get => {
  const value = await get();
  if (value) return value;
  await sleep(1000);
  return waitFor(get);
};

export const waitForElement = selector => {
  return waitFor(() => document.querySelector(selector));
};

// TODO Support changes on attributes (see observe() attributes param).
// TODO Reuse the MutationObserver instance
export const liveQuerySelectorAll = (baseElement, selector, callback) => {
  baseElement.querySelectorAll(selector).forEach(callback);
  new MutationObserver(records => {
    records.forEach(record => {
      record.addedNodes.forEach(node => {
        node = node.parentNode; // Consider the element itself
        if (!(node instanceof Element)) return;
        node.querySelectorAll(selector).forEach(callback);
      });
    });
  }).observe(baseElement, { childList: true, subtree: true });
};