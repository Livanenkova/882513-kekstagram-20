'use strict';

(function () {

  var bodyElement = document.querySelector('body');

  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var pictures = [];


  var onLoad = function (data) {
    window.gallery.renderPosts(data);
    window.gallery.showFilter();
    data.forEach(function (pic) {
      pictures.push(pic);
    });
  };

  var onError = function () {
    return true;
  };

  window.backend.load(URL, onLoad, onError);

  window.main = {
    bodyElement: bodyElement,
    pictures: pictures
  };

})();
