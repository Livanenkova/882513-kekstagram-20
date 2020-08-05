'use strict';

(function () {
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var imgControlBig = imgUploadControl.querySelector('.scale__control--bigger');
  var imgControlSmall = imgUploadControl.querySelector('.scale__control--smaller');
  var imgControlValue = document.querySelector('.scale__control--value');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUpload = document.querySelector('.img-upload__form');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  function pasteUploadedImage() {
    var file = uploadFile .files[0];
    var fileName = file.name.toLowerCase();

    var isMatch = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (isMatch) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

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
    pasteUploadedImage();
    window.utils.addClass(window.main.bodyElement, 'modal-open');
    window.utils.removeClass(imgUploadOverlay, 'hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.utils.addClass(effectLevelSlider, 'hidden');
  };

  // Функция закрытия окна загрузки фотографий при клике form.js
  var closePopup = function () {
    resetPopup();
    imgUpload.reset();
    window.utils.removeClass(window.main.bodyElement, 'modal-open');
    window.utils.addClass(imgUploadOverlay, 'hidden');
    document.removeEventListener('click', onPopupEscPress);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var resetPopup = function () {
    window.slider.resetPin();
    window.slider.changeFilter('default');
    changeImgScale(100);
    document.querySelector('.text__hashtags').setCustomValidity('');
    document.querySelector('.text__hashtags').style.border = 'none';
    document.querySelector('.text__description').setCustomValidity('');
  };

  // Функция закрытия окна загрузки фотографий при клике
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Обработчик уменьшения фотографии в окне загрузки фотографии

  imgControlSmall.addEventListener('click', function () {
    var scaleValue = Number(imgControlValue.value.slice(0, -1));
    scaleValue -= SCALE_STEP;

    if (scaleValue <= MIN_SCALE_VALUE) {
      scaleValue = MIN_SCALE_VALUE;
    }

    changeImgScale(scaleValue);
  });

  // Обработчик увеличения фотографии в окне загрузки фотографии
  imgControlBig.addEventListener('click', function () {
    var scaleValue = Number(imgControlValue.value.slice(0, -1));
    scaleValue += SCALE_STEP;

    if (scaleValue > MAX_SCALE_VALUE) {
      scaleValue = MAX_SCALE_VALUE;
    }

    changeImgScale(scaleValue);
  });

  // Функция изменения масштаба фотографии в окне загрузки фотографии

  function changeImgScale(value) {
    imgControlValue.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }

  imgUpload.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.upload('https://javascript.pages.academy/kekstagram', new FormData(imgUpload), uploadSuccess, uploadError);
  });

  function uploadSuccess() {
    imgUpload.reset();
    closePopup();
    window.renderMessage('', 'success');
  }

  function uploadError(error) {
    closePopup();
    window.renderMessage(error, 'error');
  }

  window.imgUploadPreview = imgUploadPreview;

})();
