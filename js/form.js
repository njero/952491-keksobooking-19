'use strict';

// Модуль формы объявления
(function () {

  var noticeForm = document.querySelector('.ad-form');
  var title = document.querySelector('#title');
  var imagesInput = noticeForm.querySelector('#images');
  var avatarInput = noticeForm.querySelector('#avatar');
  var selectType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var selectTimein = noticeForm.querySelector('#timein');
  var selectTimeout = noticeForm.querySelector('#timeout');
  var submitBtn = noticeForm.querySelector('.ad-form__submit');
  var resetBtn = noticeForm.querySelector('.ad-form__reset');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var invalidElements = [];

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
  //  Ограничения поля цены при изменении типа формы
  var onTypeChange = function () {
    price.placeholder = housePrices[selectType.value];
    price.setAttribute('min', housePrices[selectType.value]);
  };


  // Изменение времени заезда/выезда
  var onChangeTimeIn = function () {
    selectTimeout.value = selectTimein.value;
  };

  var onChangeTimeOut = function () {
    selectTimein.value = selectTimeout.value;
  };

  // Основные атрибуты для полей ввода
  var setMainAttributes = function (selector, required, minLength, maxLength) {
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

  var onGuestSelectChange = function () {
    capacity.setCustomValidity('');
    unhighlightInvalidElement(capacity);
  };

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

  var onSendClick = function () {
    guestInputValidation();
  };

  var formActivate = function () {
    noticeForm.classList.remove('ad-form--disabled');
    avatarInput.setAttribute('accept', 'image/png, image/jpeg');
    imagesInput.setAttribute('accept', 'image/png, image/jpeg');
    setMainAttributes('#title', true, 30, 100);
    setMainAttributes('#price', true, 1000, 1000000);
    changeAbility(true);
    price.placeholder = housePrices[selectType.value];
    addEventListeners();
  };

  /* Диактивация страницы */
  var formDeactivate = function () {
    noticeForm.reset();
    noticeForm.classList.add('ad-form--disabled');
    changeAbility(false);
    removeFormListeners();
    price.placeholder = housePrices[selectType.value];
    setAddress(window.map.DEFAULT_MAIN_PIN_COORDS);
    window.filter.deactivate();
    window.activate.reset();
  };

  var closeSuccessMessage = function () {
    success.remove();
    document.removeEventListener('keydown', onSuccessEscDown);
    success.removeEventListener('click', onSuccessClick);
  };

  var closeErrorMessage = function () {
    error.remove();
    document.removeEventListener('keydown', onErrorEscDown);
    error.removeEventListener('click', onErrorClick);
    error.querySelector('.error__button').removeEventListener('click', onErrorClick);
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
    error.querySelector('.error__button').addEventListener('click', onErrorClick);
    document.querySelector('main').appendChild(error);
  };

  var onSubmitSuccess = function () {
    noticeForm.reset();
    window.activate.reset();
    formDeactivate();
    window.map.deactivate();
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
  };

  var highlightInvalidElement = function (item) {
    invalidElements.push(item);
    item.style.borderColor = 'red';
  };

  var unhighlightInvalidElement = function (item) {
    invalidElements.splice(invalidElements.indexOf(item), 1);
    item.style.borderColor = '#d9d9d3';
  };

  var onFormInvalid = function (evt) {
    highlightInvalidElement(evt.target);
  };

  var onElementCheckValidity = function (evt) {
    if (!evt.target.checkValidity()) {
      highlightInvalidElement(evt.target);
    } else if (invalidElements.indexOf(evt.target) !== 1) {
      unhighlightInvalidElement(evt.target);
    }
  };

  var addEventListeners = function () {
    noticeForm.addEventListener('invalid', onFormInvalid, true);
    noticeForm.addEventListener('change', onElementCheckValidity);
    price.addEventListener('change', onElementCheckValidity);
    title.addEventListener('change', onElementCheckValidity);
    selectType.addEventListener('change', onTypeChange);
    selectTimein.addEventListener('change', onChangeTimeIn);
    selectTimeout.addEventListener('change', onChangeTimeOut);
    roomNumber.addEventListener('change', onGuestSelectChange);
    capacity.addEventListener('change', onGuestSelectChange);
    submitBtn.addEventListener('click', onSendClick);
    noticeForm.addEventListener('submit', onSubmitClick);
    resetBtn.addEventListener('click', onResetBtnClick);
  };

  var removeFormListeners = function () {
    noticeForm.removeEventListener('invalid', onFormInvalid, true);
    noticeForm.removeEventListener('change', onElementCheckValidity);
    price.removeEventListener('change', onElementCheckValidity);
    title.removeEventListener('change', onElementCheckValidity);
    selectType.removeEventListener('change', onTypeChange);
    selectTimein.removeEventListener('change', onChangeTimeIn);
    selectTimeout.removeEventListener('change', onChangeTimeOut);
    roomNumber.removeEventListener('change', onGuestSelectChange);
    capacity.removeEventListener('change', onGuestSelectChange);
    submitBtn.removeEventListener('click', onSendClick);
    noticeForm.removeEventListener('submit', onSubmitClick);
    resetBtn.removeEventListener('click', onResetBtnClick);
  };


  formDeactivate();
  window.form = {
    activate: formActivate,
    setAddress: setAddress,
  };
})();
