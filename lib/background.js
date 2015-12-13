/* globals chrome:false */

'use strict';

chrome.webRequest.onHeadersReceived.addListener(details => {
  if (details.statusCode === 404 &&
      details.frameId === 0 &&
      details.type == "main_frame" &&
      !details.url.startsWith('http://web.archive.org/web/') &&
      !details.url.startsWith('https://web.archive.org/web/')) {
    console.log(`${details.url} returned 404 at ${details.frameId}!`);
    console.log('redirecting to ' + `https://web.archive.org/web/*/${details.url}`);
    chrome.tabs.update(details.tabId, {'url': `https://web.archive.org/web/*/${details.url}`});
  }
}, {urls: ['<all_urls>']});
