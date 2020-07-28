'use strict';

(function () {
  // var PICTURE_COUNT = 10;
  // var filter = document.querySelector('.img-filters');
  // var filterButton = filter.querySelectorAll('.img-filters__button');
  // var filterDefault = filter.querySelector('#filter-default');
  // var filterRandom = filter.querySelector('#filter-random');
  // var filterDiscussed = filter.querySelector('#filter-discussed');

  // Функция показа фильтра
  var showFilter = function () {
    var imgFilters = document.querySelector('.img-filters');
    window.utils.removeClass(imgFilters, 'img-filters--inactive');
  };

  showFilter();
  // Обработчики изменения сортировки

  // var pictures = [];

  // var filterDefault = function () {

  // };

  // var filterRandom = function () {

  // };

  // var filterDiscussed = function () {

  // };


})();
