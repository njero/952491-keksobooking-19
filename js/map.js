'use strict';

// Модуль карты
(function () {

  var TAIL_HEIGHT = 16;

  var DEFAULT_MAIN_PIN_COORDS = {
    x: 600,
    y: 375,
  };

  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var DragBorder = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130 + TAIL_HEIGHT,
    BOTTOM: 630,
  };

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  // Отображение меток
  var showNewPins = function (data) {
    var pins = window.pin.create(data);
    var similarListElement = document.querySelector('.map__pins');
    similarListElement.appendChild(pins);
  };

  // -------- Перемещение главной метки ----------
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var mainPinPosition = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y,
      };

      var pinTailCoords = {
        x: mainPinPosition.x + Math.ceil(PinSize.WIDTH / 2),
        y: mainPinPosition.y + PinSize.HEIGHT + TAIL_HEIGHT,
      };

      if (pinTailCoords.x >= DragBorder.LEFT && pinTailCoords.x <= DragBorder.RIGHT) {
        pinMain.style.left = mainPinPosition.x + 'px';
      }
      if (pinTailCoords.y >= (DragBorder.TOP)
        && pinTailCoords.y <= DragBorder.BOTTOM) {
        pinMain.style.top = mainPinPosition.y + 'px';
      }

      window.form.setAddress(pinTailCoords);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var deactivateMap = function () {
    map.classList.add('map--faded');
    pinMain.style.top = DEFAULT_MAIN_PIN_COORDS.y + PinSize.HEIGHT / 2 + 'px';
    pinMain.style.left = DEFAULT_MAIN_PIN_COORDS.x - PinSize.WIDTH / 2 + 'px';
    window.pin.remove();
    window.card.remove();
    window.filter.deactivate();
  };

  window.map = {
    DEFAULT_MAIN_PIN_COORDS: DEFAULT_MAIN_PIN_COORDS,
    PinSize: PinSize,
    TAIL_HEIGHT: TAIL_HEIGHT,
    element: map,
    pinMain: pinMain,
    showPins: showNewPins,
    deactivate: deactivateMap,
  };
})();


