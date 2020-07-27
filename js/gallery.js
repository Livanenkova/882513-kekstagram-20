'use strict';

(function () {

  // Функция создания дом элемента, соoтветствующая фотографиям, заполненным данными из массива

  var createNewPost = function (items) {
    var template = document.querySelector('#picture').content.querySelector('a');
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = items.url;
    element.querySelector('.picture__comments').textContent = 1;
    element.querySelector('.picture__likes').textContent = items.likes;
    element.addEventListener('click', function () {
      window.preview.makeBigPicture(items);
    });
    return element;
  };

  // Функция отрисовки дом элементов в блок .pictures

  var renderPosts = function (newPosts) {
    var fragment = document.createDocumentFragment();
    var postList = document.querySelector('.pictures');
    newPosts.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });
  };

  // Функция показа фильтра

  var showFilter = function () {
    var imgFilters = document.querySelector('.img-filters');
    window.utils.removeClass(imgFilters,'img-filters--inactive');
  };

  showFilter();

  window.gallery = {
    renderPosts: renderPosts
  };

})();


