'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var template = document.querySelector('#picture').content.querySelector('a');
  var postList = document.querySelector('.pictures');

  // Функция создания дом элемента, соoтветствующая фотографиям, заполненным данными из массива

  var createNewPost = function (items) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = items.url;
    element.querySelector('.picture__comments').textContent = items.comments.length;
    element.querySelector('.picture__likes').textContent = items.likes;
    element.addEventListener('click', function () {
      window.preview.makeBigPicture(items);
    });
    return element;
  };

  // Функция отрисовки дом элементов в блок .pictures

  var renderPosts = function (newPosts) {
    var fragment = document.createDocumentFragment();
    newPosts.forEach(function (item) {
      fragment.appendChild(createNewPost(item));
      postList.appendChild(fragment);
    });
    return newPosts;
  };

  // Функция показа фильтра
  var showFilter = function () {
    window.utils.removeClass(imgFilters, 'img-filters--inactive');
  };

  window.gallery = {
    renderPosts: renderPosts,
    showFilter: showFilter
  };

})();


