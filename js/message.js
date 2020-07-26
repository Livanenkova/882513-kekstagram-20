'use strict';
(function () {
  var successMessage = document.querySelector('.success');
  var errorMessage = document.querySelector('.error');
  // var successButton = document.querySelector('.success__button');
  // var errorButton = document.querySelector('.error__button');
  // var main = document.querySelector('main');
  // var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var successMessageContainer = document.getElementById('#success');

  var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var element = template.cloneNode(true);
    return element;
    successMessageContainer.addEventListener('click', onDocumentClick);
  };

  var renderMessage = function (newMessage, type) {
    var postMessage = document.querySelector('main');
    var messageElement;
    if (type === 'error') {
      messageElement = createErrorMessage(newMessage);
    } else {
      messageElement = createSuccessMessage(newMessage);
    }
    postMessage.appendChild(messageElement);

    document.addEventListener('keydown', successMessageEscPress);
  };

  var onDocumentClick = function () {
    clouseSuccessMessage();
  };

  var clouseSuccessMessage = function () {
    window.utils.addClass(successMessage, 'hidden');

    document.removeEventListener('keydown', successMessageEscPress);
    document.removeEventListener('click', clouseSuccessMessage);
  };

  var successMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseSuccessMessage();
    }
  };

  var createErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('.error');
    var element = template.cloneNode(true);
    return element;
  };

  var clouseErrorMessage = function () {
    window.utils.addClass(errorMessage, 'hidden');

    document.removeEventListener('keydown', errorMessageEscPress);
    document.removeEventListener('click', clouseErrorMessage);
  };

  var errorMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseErrorMessage();
    }
  };


  window.message = {
    renderMessage: renderMessage
  };

})();
