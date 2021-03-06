'use strict';

(function () {

  // валидация формы form.js
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_NUMBER = 5;
  var MAX_DESCRIPTION_TEXT_LENGTH = 140;

  var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionText = document.querySelector('.text__description');

  var descriptionHandler = function () {
    descriptionText.style.border = 'none';
    descriptionText.setCustomValidity('');
    if (descriptionText.value.length > MAX_DESCRIPTION_TEXT_LENGTH) {
      descriptionText.style.border = '2px solid red';
      descriptionText.setCustomValidity('длина комментария не может составлять больше 140 символов. Удалите ' + (descriptionText.value.length - MAX_DESCRIPTION_TEXT_LENGTH) + ' символа(ов).');
    }
  };

  var hashtagHandler = function () {
    var values = hashtagInput.value.toLowerCase().split(' ');
    var errors = [];
    hashtagInput.style.border = 'none';
    hashtagInput.setCustomValidity('');
    if (hashtagInput.value !== '') {
      values.forEach(function (hashtag, index, array) {
        var message = 'Хештег ' + hashtag + ' не соответствует данным критериям: ';
        var hashtagErrors = [];

        if (hashtag[0] !== '#') {
          hashtagErrors.push('хештег должен начинаться с #');
        }
        if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
          hashtagErrors.push('длина хештега должна быть от 2 до 20 символов, включая #');
        }
        if (!hashtagSymbolsRegexp.test(hashtag)) {
          hashtagErrors.push('хештег должен состоять только из букв и цифр');
        }
        if (array.indexOf(hashtag) !== array.lastIndexOf(hashtag)) {
          hashtagErrors.push('повторяющиеся хештеги запрещены');
        }
        if (array.length > MAX_HASHTAG_NUMBER) {
          hashtagErrors.push('количество хештегов не должно быть больше 5');
        }
        message += hashtagErrors.join(', ');
        if (hashtagErrors.length > 0) {
          errors.push(message);
        }
      });
    }

    if (errors.length > 0) {
      hashtagInput.style.border = '2px solid red';
      hashtagInput.setCustomValidity(errors.join('. '));
    }
  };

  descriptionText.addEventListener('input', function () {
    descriptionHandler();
  });

  hashtagInput.addEventListener('input', function () {
    hashtagHandler();
  });

})();
