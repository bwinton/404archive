/* globals chrome:false */

'use strict';

chrome.webRequest.onHeadersReceived.addListener(details => {
  var response = {};
  if (details.statusCode === 404 && details.frameId === 0) {
    console.log(`${details.url} returned 404 at ${details.frameId}!`);
    response = {'redirectUrl': `https://web.archive.org/web/*/${details.url}`};
  }
  console.log('redirecting to ' + response.redirectUrl);
  return response;
}, {urls: ['<all_urls>']}, ['blocking']);
