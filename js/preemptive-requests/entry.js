// Inspired in https://instant.page/
// https://w3c.github.io/resource-hints/ (API)

// TODO Observe DOM mutations
// TODO Use Page Visibility API

import { whenIdle } from "../common";

const log = message => console.log(`preemptive-requests 🔮 – ${message}`);

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

(async () => {
  const origins = await whenIdle(
    () =>
      new Set(
        [...document.querySelectorAll("a[href]")]
          .map(el => getHttpOrigin(el.href))
          .filter(origin => origin)
      )
  );
  origins.delete(location.origin); // There's no point on trying to preconnect to the own origin
  [...origins].forEach(origin => whenIdle(() => preconnect(origin)));
})();
