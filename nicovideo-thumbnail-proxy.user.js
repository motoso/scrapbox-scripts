// ==UserScript==
// @name         nicovideo-thumbnail-proxy
// @namespace    https://scrapbox.io/motoso
// @version      0.1
// @description  https://scrapbox.io/motoso/nicovideo-thumbnail-proxy
// @author       motoso
// @match        https://scrapbox.io/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  "use strict";
  const getThumbnailUrl =
    "https://p56crwq5p6.execute-api.ap-northeast-1.amazonaws.com/production/getNicovideoThumbnailUrl";
  unsafeWindow.get_nicovideo_thumbnail = (url) => {
    const u = new URL(url);
    if (!["www.nicovideo.jp"].includes(u.hostname)) {
      throw Error("unexpected url!");
    }
    return new Promise((resolve) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `${getThumbnailUrl}?watchUrl=${u}`,
        onload: (res) => {
          resolve(res);
        },
        withCredentials: true,
        responseType: "json",
      });
    });
  };
})();
