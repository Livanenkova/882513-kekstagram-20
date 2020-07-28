'use strict';

(function () {

  var bodyElement = document.querySelector('body');

  // makeBigPicture(window.posts[0]);

  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var pictures = [];

  var onLoad = function (data) {
    pictures = data;
    window.gallery.renderPosts(pictures);
  };

  var onError = function () {

  };

  window.backend.load(URL, onLoad, onError);

  window.main = {
    bodyElement: bodyElement
  };

})();
