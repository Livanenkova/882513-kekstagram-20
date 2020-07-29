'use strict';

(function () {

  function addClass(item, className) {
    item.classList.add(className);
  }

  function removeClass(item, className) {
    item.classList.remove(className);
  }

  var getRandomValue = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  window.utils = {
    addClass: addClass,
    removeClass: removeClass,
    getRandomValue: getRandomValue
  };

})();


