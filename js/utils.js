'use strict';

(function () {

  function addClass(item, className) {
    item.classList.add(className);
  }

  function removeClass(item, className) {
    item.classList.remove(className);
  }

  window.utils = {
    addClass: addClass,
    removeClass: removeClass
  };

})();


