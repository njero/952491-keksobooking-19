'use strict';

// Модуль карты
(function () {
  var PinSize = {
    WIDTH: 156,
    HEIGHT: 156
  };

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var showNewPins = function () {
    var newPin = window.pins.create();
    var similarListElement = document.querySelector('.map__pins');
    similarListElement.appendChild(newPin);
  };

  window.map = {
    PinSize: PinSize,
    element: map,
    pinMain: pinMain,
    showPins: showNewPins,
  };
})();


