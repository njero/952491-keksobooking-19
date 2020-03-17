'use strict';

// Модуль карты
(function () {

  var houseNames = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  // Формирование выражения для вывода количества комнат и гостей с правильными падежами
  var getCapacityText = function (rooms, guests) {
    var text = rooms + ' ';

    if (rooms % 10 === 1 && rooms !== 11) {
      text += 'комната';
    } else if ((rooms < 21 && rooms > 4) || rooms % 10 > 5 || rooms % 10 === 0) {
      text += 'комнат';
    } else if (rooms % 10 > 1 && rooms % 10 < 5) {
      text += 'комнаты';
    }
    text += ' для ' + guests + ' ';

    if (guests % 10 === 1 && guests !== 11) {
      text += 'гостя';
    } else {
      text += 'гостей';
    }
    return text;
  };

  var cardPopup = document.querySelector('#card').content
    .querySelector('.popup');

  var createFeatureFragment = function (features) {
    var featureFragment = document.createDocumentFragment();
    features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotosFragment = function (photos) {
    var photosFragment = document.createDocumentFragment();
    var popupPhoto = cardPopup.querySelector('.popup__photo');
    photos.forEach(function (el) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = el;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  var openCard = function (data) {
    removeCard();
    var newCard = cardPopup.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = data.offer.title;
    newCard.querySelector('.popup__text--address').textContent = data.offer.address;
    newCard.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = houseNames[data.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = getCapacityText(data.offer.rooms, data.offer.guests);
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    newCard.querySelector('.popup__description').textContent = data.offer.description;

    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__features').appendChild(createFeatureFragment(data.offer.features));

    newCard.querySelector('.popup__photos').removeChild(newCard.querySelector('.popup__photo'));
    newCard.querySelector('.popup__photos').appendChild(createPhotosFragment(data.offer.photos));

    newCard.querySelector('img').src = data.author.avatar;


    var closeButton = newCard.querySelector('.popup__close');

    closeButton.addEventListener('mousedown', function (evt) {
      if (evt.button === window.utils.MouseCode.LEFT) {
        removeCard();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.KeyboardCode.ESC) {
        removeCard();
      }
    });


    var before = document.querySelector('.map__filters-container');
    before.appendChild(newCard);

    before.insertAdjacentElement('beforebegin', newCard);
  };

  window.card = {
    open: openCard,
    remove: removeCard
  };
})();
