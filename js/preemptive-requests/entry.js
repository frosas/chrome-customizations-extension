// Inspired in https://instant.page/
// https://w3c.github.io/resource-hints/ (API)

const log = message => console.log(`[preemptive-requests] ${message}`);
// TODO Observe DOM mutations
// TODO Use requestIdleCallback()
// TODO Use Page Visibility API

const appendLinkEl = attributes =>
  document.head.appendChild(
    Object.assign(document.createElement("link"), attributes)
  );

const preconnect = url => {
  log(`Preconnecting to ${url}`);
  appendLinkEl({ rel: "preconnect", href: url });
};

/**
 * @returns (string|undefined) The origin of an HTTP(S) URL, or `undefined` otherwise
 */
const getHttpOrigin = urlString => {
  const url = new URL(urlString);
  if (url.protocol.match(/^https?:/)) return `${url.protocol}//${url.host}`;
};

const origins = new Set(
  [...document.querySelectorAll("a[href]")]
    .map(el => getHttpOrigin(el.href))
    .filter(origin => origin)
);
// There's no point on trying to preconnect to the own origin
origins.delete(location.origin);
[...origins].forEach(preconnect);
