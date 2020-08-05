'use strict';
(function () {

  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var makeXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  function upload(url, data, onSuccess, onError) {
    var xhr = makeXHR(onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  }

  function load(url, onSuccess, onError) {
    var xhr = makeXHR(onSuccess, onError);
    xhr.open('GET', url);
    xhr.send();
  }

  window.backend = {
    load: load,
    upload: upload
  };

})();
