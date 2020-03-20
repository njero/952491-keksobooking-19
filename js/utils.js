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

    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.width = '500px';
    message.style.padding = '40px';
    message.style.textAlign = 'center';
    message.style.zIndex = '100';
    message.style.color = 'white';
    message.style.fontSize = '30px';
    message.style.backgroundColor = 'red';

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

