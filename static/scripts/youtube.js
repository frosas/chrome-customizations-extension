const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

const waitFor = async get => {
  const value = await get();
  if (value) return value;
  await sleep(1000);
  return waitFor(get);
};

const waitForElement = selector => {
  return waitFor(() => document.querySelector(selector));
};

(async () => {
  (await waitForElement('paper-button#more')).click();
})();