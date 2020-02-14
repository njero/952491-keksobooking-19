'use strict';

// Создание меток
(function () {

  var obj = window.data.get();

  var createNewPin = function () {
    var fragment = document.createDocumentFragment();
    var similarPinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');

    for (var i = 0; i < obj.length; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + obj[i].location.x + 'px; top: ' + obj[i].location.y + 'px;';
      pinElement.querySelector('img').src = obj[i].author.avatar;
      pinElement.querySelector('img').alt = obj[i].offer.title;
      fragment.appendChild(pinElement);
    }
    return fragment;
  };

  window.pins = {
    create: createNewPin,
  };

})();
