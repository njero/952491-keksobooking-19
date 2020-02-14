'use strict';

// Модуль карты
(function () {
  var PIN_WIDTH = 156;
  var PIN_HEIGHT = 156;
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var showNewPins = function () {
    var newPin = window.pins.create();
    var similarListElement = document.querySelector('.map__pins');
    similarListElement.appendChild(newPin);
  };

  window.map = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    element: map,
    pinMain: pinMain,
    showPins: showNewPins,
  };
})();


