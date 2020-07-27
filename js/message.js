'use strict';
(function () {

  var main = document.querySelector('main');

  var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var element = template.cloneNode(true);

    document.addEventListener('click', clouseSuccessMessage);
    document.addEventListener('keydown', successMessageEscPress);
    return element;
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

    main.removeChild(successMessage);
  };

  var createErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('.error');
    var element = template.cloneNode(true);
    document.addEventListener('click', clouseErrorMessage);
    document.addEventListener('keydown', errorMessageEscPress);
    return element;
  };

  var clouseErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    document.removeEventListener('keydown', errorMessageEscPress);
    document.removeEventListener('click', clouseErrorMessage);
    main.removeChild(errorMessage);
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
