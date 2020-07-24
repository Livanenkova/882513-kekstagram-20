'use strict';

(function () {

  var bodyElement = document.querySelector('body');

  // makeBigPicture(window.posts[0]);

  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var onLoad = function (images) {
    window.gallery.renderPosts(images);
  };

  var onError = function () {

  };

  window.backend.load(URL, onLoad, onError);

  window.main = {
    bodyElement: bodyElement
  };

})();
