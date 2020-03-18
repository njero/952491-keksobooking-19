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


  var MAX_OFFERS = 8;
  var similarOffers = [];

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  var onLoadSuccess = function (pins) {
    similarOffers = pins;
  };

  window.serverData.load(onLoadSuccess, onLoadError);

  // Обработчики нажатия на метки (передаем саму метку и данные объявления)
  var onPinClick = function (item, data) {
    item.addEventListener('click', function () {
      window.card.open(data);
    });

    item.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.KeyboardCode.ENTER) {
        window.card.open(data);
      }
    });
  };

  // Генерация меток
  var createNewPins = function () {
    var fragment = document.createDocumentFragment();
    var similarPinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');
    for (var i = 0; i < MAX_OFFERS; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + similarOffers[i].location.x + 'px; top: ' + similarOffers[i].location.y + 'px;';
      pinElement.querySelector('img').src = similarOffers[i].author.avatar;
      pinElement.querySelector('img').alt = similarOffers[i].offer.title;
      onPinClick(pinElement, similarOffers[i]);
      fragment.appendChild(pinElement);
    }

    return fragment;
  };

  // Отображение меток
  var showNewPins = function () {
    var newPin = createNewPins();
    var similarListElement = document.querySelector('.map__pins');
    similarListElement.appendChild(newPin);
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


  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (el) {
      el.remove();
    });
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    pinMain.style.top = DEFAULT_MAIN_PIN_COORDS.y - PinSize.HEIGHT / 2 + 'px';
    pinMain.style.left = DEFAULT_MAIN_PIN_COORDS.x - PinSize.WIDTH / 2 + 'px';
    removePins();
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    //  deactivateFilter();
  };

  window.map = {
    DEFAULT_MAIN_PIN_COORDS: DEFAULT_MAIN_PIN_COORDS,
    PinSize: PinSize,
    element: map,
    pinMain: pinMain,
    showPins: showNewPins,
    deactivate: deactivateMap,
  };
})();


