'use strict';

(function () {
  var MouseCode = {
    LEFT: 0,
  };

  var KeyboardCode = {
    ENTER: 'Enter',
    ESC: 'Escape',
  };

  var DEBOUNCE_INTERVAL = 300;

  var onEscDown = function (evt, func) {
    if (evt.key === KeyboardCode.ESC) {
      func();
    }
  };

  var renderErrorMessage = function (errorMessage) {
    var message = document.createElement('div');

    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    MouseCode: MouseCode,
    KeyboardCode: KeyboardCode,
    onEscDown: onEscDown,
    renderErrorMessage: renderErrorMessage,
    debounce: debounce,
  };
})();

