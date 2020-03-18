// Файл render.js
'use strict';
(function () {
  var MAX_OFFERS = 5;

  var similarPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');

  var createPin = function (pinData) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + pinData.location.x + 'px; top: ' + pinData.location.y + 'px;';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
    onPinClick(pinElement, pinData);
    return pinElement;
  };

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

  /* Генерация меток */
  var createPins = function (data) {
    var takeNumber = data.length > MAX_OFFERS ? MAX_OFFERS : data.length;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    return fragment;
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (el) {
      el.remove();
    });
  };

  window.pin = {
    create: createPins,
    remove: removePins
  };
})();
