'use strict';

(function () {


  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  // Функция открытия модального окна с большой фотографией. preview.js

  var makeBigPicture = function (photo) {

    window.utils.removeClass(bigPicture, 'hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    var comments = window.data.createComment();
    for (var i = 0; i < comments.length; i++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      var p = document.createElement('p');

      window.utils.addClass(li, 'social__comment');
      window.utils.addClass(img, 'social__picture');
      window.utils.addClass(p, 'social__text');

      img.src = comments[i].avatar;
      p.innerText = comments[i].message;
      li.appendChild(img);
      li.appendChild(p);
      bigPicture.querySelector('.social__comments').appendChild(li);
    }

    window.utils.addClass(window.main.bodyElement, 'modal-open');

    makeCommentsHidden();
  };

  // Функция скрытия блоков комментариев preview.js
  var makeCommentsHidden = function () {

    window.utils.addClass(socialCommentCount, 'hidden');
    window.utils.addClass(commentsLoader, 'hidden');

  };

  // Функция закрытия модального окна с большой фотографией. preview.js
  var clouseBigCancel = document.querySelector('.big-picture__cancel');

  clouseBigCancel.addEventListener('click', function () {
    clouseBigPicture();
  });

  var clouseBigPicture = function () {
    window.utils.removeClass(window.main.bodyElement, 'modal-open');
    window.utils.removeClass(window.main.bodyElement, 'hidden');
    window.utils.addClass(bigPicture, 'hidden');

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


    makeBigPicture: makeBigPicture,
    bigPicture: bigPicture

  };

})();


