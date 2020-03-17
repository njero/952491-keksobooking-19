'use strict';

// Модуль карты
(function () {
  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
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

  window.load(onLoadSuccess, onLoadError);


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

  var showNewPins = function () {
    var newPin = createNewPins();
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


