'use strict';

// Создание меток
(function () {

  var MAX_OFFERS = 8;
  var similarOffers = [];

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (pins) {
    similarOffers = pins;
  };

  window.load(successHandler, errorHandler);

  var createNewPins = function () {
    var fragment = document.createDocumentFragment();
    var similarPinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');

    for (var i = 0; i < MAX_OFFERS; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + similarOffers[i].location.x + 'px; top: ' + similarOffers[i].location.y + 'px;';
      pinElement.querySelector('img').src = similarOffers[i].author.avatar;
      pinElement.querySelector('img').alt = similarOffers[i].offer.title;
      fragment.appendChild(pinElement);
    }

    return fragment;
  };

  window.pins = {
    create: createNewPins,
  };

})();
