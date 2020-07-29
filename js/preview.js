'use strict';

(function () {

  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var COMMENTS_COUNT = 5;

  // Функция открытия модального окна с большой фотографией. preview.js

  var makeBigPicture = function (photo) {

    window.utils.removeClass(bigPicture, 'hidden');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    var moreCommentsHandler = getComments(photo.comments);
    moreCommentsHandler();
    window.utils.addClass(window.main.bodyElement, 'modal-open');
    // makeCommentsHidden();
    commentsLoader.addEventListener('click', function () {
      moreCommentsHandler();
    });
  };

  var renderComment = function (comments, start, end) {

    for (var i = start; i < end; i++) {
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
  };

  var getComments = function (comments) {
    bigPicture.querySelector('.social__comments').textContent = '';
    var start = 0;
    var end = comments.length > COMMENTS_COUNT ? COMMENTS_COUNT : comments.length;
    return function () {
      renderComment(comments, start, end);

      if (end === comments.length) {
        window.utils.addClass(commentsLoader, 'hidden');
      } else {
        window.utils.removeClass(commentsLoader, 'hidden');
      }
      start += comments.length > (COMMENTS_COUNT + start) ? COMMENTS_COUNT : comments.length - start;
      end += comments.length > (COMMENTS_COUNT + end) ? COMMENTS_COUNT : comments.length - end;
    };
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
    bigPicture: bigPicture,
    renderComment: renderComment
  };

})();


