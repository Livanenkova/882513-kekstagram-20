'use strict';
(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var createSuccessMessage = function () {
    var element = templateSuccess.cloneNode(true);
    document.addEventListener('click', clouseSuccessMessage);
    document.addEventListener('keydown', successMessageEscPress);
    return element;
  };

  var renderMessage = function (newMessage, type) {
    var messageElement;
    if (type === 'error') {
      messageElement = createErrorMessage(newMessage);
    } else {
      messageElement = createSuccessMessage(newMessage);
    }
    window.main.bodyElement.appendChild(messageElement);
  };

  var successMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseSuccessMessage();
    }
  };

  var clouseSuccessMessage = function () {
    var successMessage = document.querySelector('.success');

    document.removeEventListener('click', clouseSuccessMessage);
    document.removeEventListener('keydown', successMessageEscPress);

    window.main.bodyElement.removeChild(successMessage);
  };

  var createErrorMessage = function () {
    var element = templateError.cloneNode(true);
    document.addEventListener('click', clouseErrorMessage);
    document.addEventListener('keydown', errorMessageEscPress);
    return element;
  };

  var clouseErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    document.removeEventListener('keydown', errorMessageEscPress);
    document.removeEventListener('click', clouseErrorMessage);
    window.main.bodyElement.removeChild(errorMessage);
  };

  var errorMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clouseErrorMessage();
    }
  };

  window.renderMessage = renderMessage;

})();
