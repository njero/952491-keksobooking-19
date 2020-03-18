'use strict';

// Модуль формы объявления
(function () {

  var noticeForm = document.querySelector('.ad-form');
  var imagesInput = noticeForm.querySelector('#images');
  var avatarInput = noticeForm.querySelector('#avatar');
  var selectType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var selectTimein = noticeForm.querySelector('#timein');
  var selectTimeout = noticeForm.querySelector('#timeout');
  var submitBtn = noticeForm.querySelector('.ad-form__submit');
  var resetBtn = noticeForm.querySelector('.ad-form__reset');

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

  avatarInput.setAttribute('accept', 'image/png, image/jpeg');

  imagesInput.setAttribute('accept', 'image/png, image/jpeg');

  //  Ограничения поля цены при изменении типа формы
  var setPriceLengthLimit = function () {
    price.placeholder = housePrices[selectType.value];
    price.setAttribute('min', housePrices[selectType.value]);
  };


  // Изменение времени заезда/выезда
  var changeTimeIn = function () {
    selectTimeout.value = selectTimein.value;
  };

  var changeTimeOut = function () {
    selectTimein.value = selectTimeout.value;
  };

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

  var formActivate = function () {
    noticeForm.classList.remove('ad-form--disabled');
    mainAttributes('#title', true, 30, 100);
    mainAttributes('#price', true, 1000, 1000000);
    changeAbility(true);
    addEventListeners();
  };

  /* Диактивация страницы */
  var formDeactivate = function () {
    noticeForm.reset();
    noticeForm.classList.add('ad-form--disabled');
    changeAbility(false);
    removeFormListeners();
    setAddress(window.map.DEFAULT_MAIN_PIN_COORDS);
  };

  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');

  var closeSuccessMessage = function () {
    success.remove();
    document.removeEventListener('keydown', onSuccessEscDown);
    success.removeEventListener('click', onSuccessClick);
  };

  var closeErrorMessage = function () {
    error.remove();
    document.removeEventListener('keydown', onErrorEscDown);
    error.removeEventListener('click', onErrorClick);
    error.querySelector('error__button').removeEventListener('click', onErrorClick);
  };

  var onSuccessEscDown = function (evt) {
    window.utils.onEscDown(evt, closeSuccessMessage);
  };

  var onErrorEscDown = function (evt) {
    window.utils.onEscDown(evt, closeErrorMessage);
  };

  var onSuccessClick = function () {
    closeSuccessMessage();
  };

  var onErrorClick = function () {
    closeErrorMessage();
  };

  var showMessage = function (mes) {
    document.addEventListener('keydown', onSuccessEscDown);
    document.addEventListener('click', onSuccessClick);
    document.querySelector('main').appendChild(mes);
  };


  var showErrorMessage = function (evt) {
    window.utils.onEscDown(evt, closeErrorMessage);
    document.addEventListener('click', onErrorClick);
    error.querySelector('error__button').removeEventListener('click', onErrorClick);
    document.querySelector('main').appendChild(error);
  };

  var onSubmitSuccess = function () {
    noticeForm.reset();
    formDeactivate();
    window.map.deactivate();
    window.pin.remove();
    window.filter.deactivate();
    showMessage(success);
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    var formData = new FormData(noticeForm);
    window.serverData.upload(formData, onSubmitSuccess, showErrorMessage);
  };

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    formDeactivate();
    window.map.deactivate();
    window.pin.remove();
    window.filter.deactivate();
  };

  var addEventListeners = function () {
    selectType.addEventListener('change', setPriceLengthLimit);
    selectTimein.addEventListener('change', changeTimeIn);
    selectTimeout.addEventListener('change', changeTimeOut);
    roomNumber.addEventListener('change', guestInputValidation);
    submitBtn.addEventListener('click', guestInputValidation);
    noticeForm.addEventListener('submit', onSubmitClick);
    resetBtn.addEventListener('click', onResetBtnClick);
  };

  var removeFormListeners = function () {
    selectType.removeEventListener('change', setPriceLengthLimit);
    selectTimein.removeEventListener('change', changeTimeIn);
    selectTimeout.removeEventListener('change', changeTimeOut);
    roomNumber.removeEventListener('change', guestInputValidation);
    submitBtn.removeEventListener('click', guestInputValidation);
    noticeForm.removeEventListener('submit', onSubmitClick);
    resetBtn.removeEventListener('click', onResetBtnClick);
  };


  formDeactivate();
  window.form = {
    activate: formActivate,
    setAddress: setAddress,
  };
})();
