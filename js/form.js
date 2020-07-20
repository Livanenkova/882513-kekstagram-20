'use strict';

(function () {
  // Блок загрузки фотографий form.js

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var bodyElement = document.querySelector('body');
  var sliderPin = document.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');
  var effect = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var imgControlBig = imgUploadControl.querySelector('.scale__control--bigger');
  var imgcontrolSmall = imgUploadControl.querySelector('.scale__control--smaller');
  var imgControlValue = document.querySelector('.scale__control--value');

  // Обработчик открытия окна загрузки фотографий form.js
  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  // Обработчик закрытия окна загрузки фотографий form.js
  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  // Функция открытия окна загрузки фотографий form.js
  var openPopup = function () {
    bodyElement.classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна загрузки фотографий при клике form.js
  var closePopup = function () {
    bodyElement.classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна загрузки фотографий при клике form.js
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && document.querySelector('.text__hashtags') !== document.activeElement && document.querySelector('.text__description') !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Обработчик уменьшения фотографии в окне загрузки фотографии form.js

  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  imgcontrolSmall.addEventListener('click', function () {
    var scaleValue = Number(imgControlValue.value.slice(0, -1));
    scaleValue -= SCALE_STEP;

    if (scaleValue <= MIN_SCALE_VALUE) {
      scaleValue = MIN_SCALE_VALUE;
    }

    changeImgScale(scaleValue);
  });

  // Обработчик увеличения фотографии в окне загрузки фотографии form.js
  imgControlBig.addEventListener('click', function () {
    var scaleValue = Number(imgControlValue.value.slice(0, -1));
    scaleValue += SCALE_STEP;

    if (scaleValue > MAX_SCALE_VALUE) {
      scaleValue = MAX_SCALE_VALUE;
    }

    changeImgScale(scaleValue);
  });

  // Функция изменения масштаба фотографии в окне загрузки фотографии form.js

  function changeImgScale(value) {
    imgControlValue.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }

  // Функция наложения эффекта на изображение form.js

  function onFilterChange(event) {
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = null;
    imgUploadPreview.classList.add('effects__preview--' + event.target.value);

    if (event.target.value === 'none') {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }
  }

  // Обработчик движения слайдера form.js

  line.addEventListener('mousedown', function () {

    var offSet = sliderPin.offsetLeft;
    var lineWidth = line.offsetWidth;
    var effectValue = Math.round(offSet * 100 / lineWidth);
    effect.value = effectValue;
  });

  var imgEffectsContainer = document.querySelector('.img-upload__effects');
  imgEffectsContainer.addEventListener('change', onFilterChange);

  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  //  var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');

  //  function onEffectLevelChange() {
  //    switch (imgUploadPreview.className) {
  //      case 'effects__preview--chrome':
  //        imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
  //        break;
  //      case 'effects__preview--sepia':
  //        imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
  //        break;
  //      case 'effects__preview--marvin':
  //        imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
  //        break;
  //      case 'effects__preview--phobos':
  //        imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
  //        break;
  //      case 'effects__preview--heat':
  //        imgUploadPreview.style.filter = 'brightness(' + (effectLevelInput.value * 3 / 100 + 1) + ')';
  //        break;
  //      default:
  //        imgUploadPreview.style.filter = null;
  //   }
  // }


  // валидация формы form.js
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_NUMBER = 5;
  var MAX_DESCRIPTION_TEXT_LENGTH = 140;
  // var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionText = document.querySelector('.text__description');

  descriptionText.addEventListener('input', function () {
    if (descriptionText.value.length > MAX_DESCRIPTION_TEXT_LENGTH) {
      descriptionText.setCustomValidity('длина комментария не может составлять больше 140 символов. Удалите ' + (descriptionText.value.length - MAX_DESCRIPTION_TEXT_LENGTH) + ' символа(ов).');
    } else {
      descriptionText.setCustomValidity('');
    }
  });

  hashtagInput.addEventListener('input', function () {
    var values = hashtagInput.value.toLowerCase().split(' ');
    var errors = [];

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
    if (errors.length > 0) {
      hashtagInput.setCustomValidity(errors.join('. '));
    } else {
      hashtagInput.setCustomValidity('');
    }
  });

  hashtagInput.addEventListener('focus', function () {

  });


})();


