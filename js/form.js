'use strict';

(function () {
  // Блок загрузки фотографий form.js
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var imgControlBig = imgUploadControl.querySelector('.scale__control--bigger');
  var imgControlSmall = imgUploadControl.querySelector('.scale__control--smaller');
  var imgControlValue = document.querySelector('.scale__control--value');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('.img-upload__form');

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
    imgUploadForm.reset();
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

  imgControlSmall.addEventListener('click', function () {
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

  imgUploadForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.upload('https://javascript.pages.academy/kekstagram', new FormData(imgUploadForm), uploadSuccess, uploadError);
  });

  function uploadSuccess() {
    imgUploadForm.reset();
    closePopup();
    window.message.renderMessage('', 'success');
  }

  function uploadError(error) {
    closePopup();
    window.message.renderMessage(error, 'error');
  }

  window.form = {
    imgUploadPreview: imgUploadPreview,
    imgUploadForm: imgUploadForm
  };
})();
