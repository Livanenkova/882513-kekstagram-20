'use strict';
(function () {

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelPin.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');

  effectLevelLine.addEventListener('mousedown', function (evt) {

    var offSet = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var effectValue = Math.round(offSet * 100 / lineWidth);
    effectLevelValue.value = effectValue;
    // var effectDepth = effectLevelLine.querySelector('.effect-level__depth');


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

      // вынести в отдельную функцию и вызывать со знаечением 100
      var newX = effectLevelPin.offsetLeft - shift.x;

      if (newX >= 0 && newX <= lineWidth) {

        var levelPin = effectLevelPin.offsetLeft;
        var effect = Math.round(levelPin * 100 / lineWidth);
        effectLevelLine.value = effect;
        effectLevelPin.style.left = (newX) + 'px';
        effectLevelDepth.style.width = (newX * 100 / lineWidth) + '%';

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


  function onEffectLevelChange() {

    switch (window.form.imgUploadPreview.className) {
      case 'effects__preview--chrome':

        window.form.imgUploadPreview.style.filter = 'grayscale(' + (effectLevelValue.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        window.form.imgUploadPreview.style.filter = 'sepia(' + (effectLevelValue.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        window.form.imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.form.imgUploadPreview.style.filter = 'blur(' + (effectLevelValue.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        window.form.imgUploadPreview.style.filter = 'brightness(' + (effectLevelValue.value * 3 / 100 + 1) + ')';

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

  effectLevelLine.addEventListener('mousemove', onEffectLevelChange);


})();
