'use strict';

(function () {
  // Функция открытия модального окна с большой фотографией. preview.js

  var makeBigPicture = function (photo) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    var comments = window.data.createComment();
    for (var i = 0; i < comments.length; i++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      var p = document.createElement('p');
      li.classList.add('social__comment');
      img.classList.add('social__picture');
      p.classList.add('social__text');
      img.src = comments[i].avatar;
      p.innerText = comments[i].message;
      li.appendChild(img);
      li.appendChild(p);
      bigPicture.querySelector('.social__comments').appendChild(li);
    }
    document.querySelector('body').classList.add('modal-open');
    makeCommentsHidden();
  };

  // Функция скрытия блоков комментариев preview.js
  var makeCommentsHidden = function () {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  // Функция закрытия модального окна с большой фотографией. preview.js
  var clouseBigCancel = document.querySelector('.big-picture__cancel');

  clouseBigCancel.addEventListener('click', function () {
    clouseBigPicture();
  });

  var clouseBigPicture = function () {
    var bodyElement = document.querySelector('body');
    bodyElement.classList.remove('modal-open');
    document.querySelector('.big-picture').classList.add('hidden');
  };

  // Функция закрытия модального окна с большой фотографией при нажатии esс. preview.js
  var bigPictureEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseBigPicture();
    }
  };

  document.addEventListener('keydown', function (evt) {
    bigPictureEscPress(evt);
  });

  window.preview = {
    makeBigPicture: makeBigPicture
  };

})();


