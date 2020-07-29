'use strict';

(function () {

  var PHOTO_COUNT = 10;

  var pictures = document.querySelector('.pictures');
  var imgFiltersButton = document.querySelector('.img-filters__form');

  // Обработчик клика по кнопкам переключения фильтра
  imgFiltersButton.addEventListener('click', window.debounce.debounce(function (event) {
    updatePhotos(event.target.id);
  }));

  var updatePhotos = function (buttonId) {
    clear();
    var photos = [];
    switch (buttonId) {
      case 'filter-random':
        photos = makeRandomPhoto();
        break;
      case 'filter-discussed':
        photos = makeDiscussedPhoto();
        break;
      case 'filter-default':
        photos = window.main.pictures;
        break;
      default:
        photos = window.main.pictures;
    }

    window.gallery.renderPosts(photos);
  };

  var clear = function () {
    var picturesElement = Array.from(pictures.querySelectorAll('.picture'));
    picturesElement.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  // Функция сортировки  10 случайных, не повторяющихся фотографий.
  var makeRandomPhoto = function () {
    var photos = window.main.pictures;
    var photoRamdom = [];
    while (photoRamdom.length < PHOTO_COUNT) {
      var photoNumber = window.utils.getRandomValue(0, photos.length - 1);
      photoRamdom.push(photos[photoNumber]);
    }
    return photoRamdom;
  };

  // Функция сортировки фотографии, отсортированных в порядке убывания количества комментариев.
  var makeDiscussedPhoto = function () {
    var photos = window.main.pictures.slice();
    var PhotoDiscussed = photos.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return PhotoDiscussed;
  };

})();
