'use strict';

(function () {
  var MAX_OFFERS = 5;

  var similarPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');

  // Обработчики нажатия на метки (передаем саму метку и данные объявления)
  var addPinClickListeners = function (item, data) {
    item.addEventListener('click', function () {
      window.card.open(data);
      item.classList.add('map__pin--active');
    });

    item.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.KeyboardCode.ENTER) {
        window.card.open(data);
        item.classList.add('map__pin--active');
      }
    });
  };

  var createPin = function (pinData) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pinData.location.x - Math.ceil(window.map.PinSize.WIDTH / 2) + 'px';
    pinElement.style.top = pinData.location.y - window.map.TAIL_HEIGHT - window.map.PinSize.HEIGHT + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
    addPinClickListeners(pinElement, pinData);
    return pinElement;
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
