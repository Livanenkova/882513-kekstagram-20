'use strict';
(function () {
  var sliderPin = document.querySelector('.effect-level__pin');
  var effect = document.querySelector('.effect-level__value');
  var line = document.querySelector('.effect-level__line');

  line.addEventListener('mousedown', function (evt) {

    var offSet = sliderPin.offsetLeft;
    var lineWidth = line.offsetWidth;
    var effectValue = Math.round(offSet * 100 / lineWidth);
    effect.value = effectValue;
    var effectDepth = line.querySelector('.effect-level__depth');

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

  // Обработчик движения слайдера form.js
  var imgEffectsContainer = document.querySelector('.img-upload__effects');
  imgEffectsContainer.addEventListener('change', onFilterChange);

  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');

  function onEffectLevelChange() {

    switch (window.form.imgUploadPreview.className) {
      case 'effects__preview--chrome':
        window.form.imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        window.form.imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        window.form.imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.form.imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        window.form.imgUploadPreview.style.filter = 'brightness(' + (effectLevelInput.value * 3 / 100 + 1) + ')';
        break;
      default:
        window.form.imgUploadPreview.style.filter = null;
    }
  }

  // Функция наложения эффекта на изображение form.js

  function onFilterChange(event) {
    window.form.imgUploadPreview.className = '';
    window.form.imgUploadPreview.style.filter = null;
    window.utils.addClass(window.form.imgUploadPreview, 'effects__preview--' + event.target.value);
    if (event.target.value === 'none') {
      window.utils.addClass(effectLevelSlider, 'hidden');
    } else {
      window.utils.removeClass(effectLevelSlider, 'hidden');
    }
  }

  line.addEventListener('mousemove', onEffectLevelChange);

})();
