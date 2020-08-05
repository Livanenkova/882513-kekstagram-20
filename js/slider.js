'use strict';
(function () {
  var MAX_LINE_VALUE = 450;
  var EFFECT_VALUE = 100;

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');

  effectLevelLine.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var linesWidth = effectLevelLine.offsetWidth;
      var newX = effectLevelPin.offsetLeft - shift.x;
      var effect = Math.round(newX * 100 / linesWidth);

      movePin(newX, effect);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var movePin = function (newX, effect) {
    var lineWidth = effectLevelLine.offsetWidth;
    if (newX >= 0 && newX <= lineWidth) {
      effectLevelValue.value = effect;
      effectLevelPin.style.left = (newX) + 'px';
      effectLevelDepth.style.width = (newX * 100 / lineWidth) + '%';
      onEffectLevelChange();
    }
  };

  // Обработчик движения слайдера
  var imgEffectsContainer = document.querySelector('.img-upload__effects');
  var effectValue = document.querySelector('.effect-level__value');
  imgEffectsContainer.addEventListener('change', onFilterChange);
  effectValue.addEventListener('change', onFilterChange);

  function onEffectLevelChange() {
    window.imgUploadPreview.style.filter = null;
    switch (window.imgUploadPreview.className) {
      case 'effects__preview--chrome':
        window.imgUploadPreview.style.filter = 'grayscale(' + (effectLevelValue.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        window.imgUploadPreview.style.filter = 'sepia(' + (effectLevelValue.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        window.imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.imgUploadPreview.style.filter = 'blur(' + (effectLevelValue.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        window.imgUploadPreview.style.filter = 'brightness(' + (effectLevelValue.value * 3 / 100 + 1) + ')';
        break;
      default:
        window.imgUploadPreview.style.filter = null;
    }
  }

  // Функция наложения эффекта на изображение

  var changeFilter = function (filter) {
    window.imgUploadPreview.className = '';
    window.imgUploadPreview.style.filter = null;
    window.utils.addClass(window.imgUploadPreview, 'effects__preview--' + filter);
    if (event.target.value === 'none') {
      window.utils.addClass(effectLevelSlider, 'hidden');
    } else {
      window.utils.removeClass(effectLevelSlider, 'hidden');
    }
  };

  function onFilterChange(event) {
    movePin(MAX_LINE_VALUE, EFFECT_VALUE);
    changeFilter(event.target.value);
  }

  var resetPin = function () {
    movePin(MAX_LINE_VALUE, EFFECT_VALUE);
  };

  window.slider = {
    resetPin: resetPin,
    changeFilter: changeFilter
  };

})();
