'use strict';

// Модуль формы объявления
(function () {

  var noticeForm = document.querySelector('.ad-form');
  var formTags = [
    '#avatar',
    '#title',
    '#address',
    '#type',
    '#price',
    '#timein',
    '#timeout',
    '#room_number',
    '#capacity',
    '.features',
    '#description',
    '#images',
    '.ad-form__submit',
    '.ad-form__reset',
  ];

  var housePrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };

  var changeFormElementAbility = function (selector, isActivate) {
    if (isActivate) {
      noticeForm.querySelector(selector).removeAttribute('disabled');
    } else {
      noticeForm.querySelector(selector).setAttribute('disabled', '');
    }
  };

  // Перевод элементов формы в положение disable
  var changeAbility = function (isActivate) {
    for (var i = 0; i < formTags.length; i++) {
      changeFormElementAbility(formTags[i], isActivate);
    }
  };

  /* Вставка адреса в поле формы */
  var setAddress = function (coords) {
    noticeForm.querySelector('#address').setAttribute('readonly', '');
    noticeForm.querySelector('#address').value = coords.x + ', ' + coords.y;
  };


  // -----Валидация----
  var avatarInput = noticeForm.querySelector('#avatar');
  avatarInput.setAttribute('accept', 'image/png, image/jpeg');

  var imagesInput = noticeForm.querySelector('#images');
  imagesInput.setAttribute('accept', 'image/png, image/jpeg');

  var selectType = noticeForm.querySelector('#type');
  //  Ограничения поля цены при изменении типа формы
  var setPriceLengthLimit = function () {
    var price = noticeForm.querySelector('#price');
    price.placeholder = housePrices[selectType.value];
    price.setAttribute('min', housePrices[selectType.value]);
  };

  selectType.addEventListener('change', setPriceLengthLimit);

  var selectTimein = noticeForm.querySelector('#timein');
  var selectTimeout = noticeForm.querySelector('#timeout');

  // Изменение времени заезда/выезда
  var changeTimeIn = function () {
    selectTimeout.value = selectTimein.value;
  };

  var changeTimeOut = function () {
    selectTimein.value = selectTimeout.value;
  };

  selectTimein.addEventListener('change', changeTimeIn);
  selectTimeout.addEventListener('change', changeTimeOut);

  // Основные атрибуты для полей ввода
  var mainAttributes = function (selector, required, minLength, maxLength) {
    var elem = noticeForm.querySelector(selector);
    if (required) {
      elem.setAttribute('required', '');
    }
    if (selector === '#price') {
      elem.setAttribute('min', minLength);
      elem.setAttribute('max', maxLength);
    } else {
      if (minLength) {
        elem.setAttribute('minlength', minLength);
      }
      if (maxLength) {
        elem.setAttribute('maxlength', maxLength);
      }
    }

  };

  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  // Валидация поля количества гостей
  var guestInputValidation = function () {
    switch (roomNumber.value) {
      case '1': {
        if (capacity.value !== '1') {
          capacity.setCustomValidity('Только для 1 гостя');
          return;
        }
        break;
      }
      case '2': {
        if (capacity.value !== '1' || capacity.value !== '2') {
          capacity.setCustomValidity('Только для 1 или 2 гостей');
        }
        return;
      }
      case '3': {
        if (capacity.value === '0') {
          capacity.setCustomValidity('Только для 1, 2 или 3 гостей');
        }
        return;

      }
      case '100': {
        if (capacity.value !== '0') {
          capacity.setCustomValidity('Только не для гостей');
        }
        return;
      }
    }
    capacity.setCustomValidity('');

  };

  roomNumber.addEventListener('input', guestInputValidation);
  noticeForm.querySelector('.ad-form__submit').addEventListener('click', guestInputValidation);

  var formActivate = function () {
    noticeForm.classList.remove('ad-form--disabled');
    mainAttributes('#title', true, 30, 100);
    mainAttributes('#price', true, 1000, 1000000);
    changeAbility(true);
  };


  /* До активации страницы */
  changeAbility(false);
  setAddress(window.map.DEFAULT_MAIN_PIN_COORDS);


  window.form = {
    activate: formActivate,
    setAddress: setAddress
  };
})();
