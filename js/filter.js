'use strict';

(function () {

  var PHOTO_COUNT = 10;

  var pictures = document.querySelector('.pictures');
  var filtersButtonWrapper = document.querySelector('.img-filters__form');
  var imgFiltersButton = document.querySelectorAll('.img-filters__button');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  // Обработчик клика по кнопкам переключения фильтра
  filtersButtonWrapper.addEventListener('click', window.debounce(function (event) {
    updatePhotos(event.target.id);
  }));

  var updatePhotos = function (buttonId) {
    clear();
    imgFiltersButton.forEach(function (btn) {
      window.utils.removeClass(btn, 'img-filters__button--active');
    });
    var photos = [];
    switch (buttonId) {
      case 'filter-random':
        window.utils.addClass(filterRandom, 'img-filters__button--active');
        photos = makeRandomPhoto();
        break;
      case 'filter-discussed':
        photos = makeDiscussedPhoto();
        window.utils.addClass(filterDiscussed, 'img-filters__button--active');
        break;
      case 'filter-default':
        photos = window.main.pictures;
        window.utils.addClass(filterDefault, 'img-filters__button--active');
        break;
      default:
        photos = window.main.pictures;
        window.utils.addClass(filterDefault, 'img-filters__button--active');
    }

    window.gallery.renderPosts(photos);
  };

  var clear = function () {
    var elementPictures = Array.from(pictures.querySelectorAll('.picture'));
    elementPictures.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  // Функция сортировки  10 случайных, не повторяющихся фотографий.
  var makeRandomPhoto = function () {
    var photos = window.main.pictures;
    var randomPhotos = [];
    while (randomPhotos.length < PHOTO_COUNT) {
      var photoNumber = window.utils.getRandomValue(0, photos.length - 1);
      randomPhotos.push(photos[photoNumber]);
    }
    return randomPhotos;

  };

  // Функция сортировки фотографии, отсортированных в порядке убывания количества комментариев.
  var makeDiscussedPhoto = function () {
    var photos = window.main.pictures.slice();
    var discussedPhotos = photos.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }

    });
    return discussedPhotos;
  };

})();
