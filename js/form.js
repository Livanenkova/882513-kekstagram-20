'use strict';

(function () {
  // Блок загрузки фотографий form.js
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var sliderPin = document.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');
  var effect = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var imgControlBig = imgUploadControl.querySelector('.scale__control--bigger');
  var imgcontrolSmall = imgUploadControl.querySelector('.scale__control--smaller');
  var imgControlValue = document.querySelector('.scale__control--value');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

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
    window.utils.addClass(window.main.bodyElement, 'modal-open');
    window.utils.removeClass(imgUploadOverlay, 'hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна загрузки фотографий при клике form.js
  var closePopup = function () {
    window.utils.removeClass(window.main.bodyElement, 'modal-open');
    window.utils.addClass(imgUploadOverlay, 'hidden');
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
    // imgUploadPreview.classList.add('effects__preview--' + event.target.value);

    window.utils.addClass(imgUploadPreview, 'effects__preview--' + event.target.value);
    if (event.target.value === 'none') {
      window.utils.addClass(effectLevelSlider, 'hidden');
    } else {
      window.utils.removeClass(effectLevelSlider, 'hidden');
    }
  }

  // Обработчик движения слайдера form.js

  line.addEventListener('mousedown', function (evt) {

    var offSet = sliderPin.offsetLeft;
    var lineWidth = line.offsetWidth;
    var effectValue = Math.round(offSet * 100 / lineWidth);
    effect.value = effectValue;
    var effectDepth = line.querySelector('.effect-level__depth');

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newX = sliderPin.offsetLeft - shift.x;

      if (newX >= 0 && newX <= lineWidth) {

        // var offSet = sliderPin.offsetLeft;
        // var effectValue = Math.round(offSet * 100 / lineWidth);
        effect.value = effectValue;
        sliderPin.style.left = (newX) + 'px';
        effectDepth.style.width = (newX * 100 / lineWidth) + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var imgEffectsContainer = document.querySelector('.img-upload__effects');
  imgEffectsContainer.addEventListener('change', onFilterChange);

  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');

  function onEffectLevelChange() {

    switch (imgUploadPreview.className) {
      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        imgUploadPreview.style.filter = 'brightness(' + (effectLevelInput.value * 3 / 100 + 1) + ')';
        break;
      default:
        imgUploadPreview.style.filter = null;
    }
  }

  line.addEventListener('mousemove', onEffectLevelChange);

})();
