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
      window.form.notice.querySelector(selector).removeAttribute('disabled');
    } else {
      window.form.notice.querySelector(selector).setAttribute('disabled', '');
    }
  };

  // Перевод элементов формы в положение disable
  var changeAbility = function (isActivate) {
    for (var i = 0; i < formTags.length; i++) {
      changeFormElementAbility(formTags[i], isActivate);
    }
  };

  // Получение адреса
  var getAddress = function () {
    var x = Math.floor(parseInt(window.map.pinMain.style.left, 10) + window.map.PinSize.WIDTH / 2);
    var y = Math.floor(parseInt(window.map.pinMain.style.top, 10) + window.map.PinSize.HEIGHT);
    return x + ', ' + y;
  };

  /* Вставка адреса в поле формы */
  var fillAddress = function () {
    noticeForm.querySelector('#address').setAttribute('readonly', '');
    noticeForm.querySelector('#address').value = getAddress();
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

  selectType.addEventListener('input', setPriceLengthLimit);

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


  window.form = {
    notice: noticeForm,
    mainAttributes: mainAttributes,
    changeAbility: changeAbility,
    fillAddress: fillAddress,
  };
})();
