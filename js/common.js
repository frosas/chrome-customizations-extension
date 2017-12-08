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

