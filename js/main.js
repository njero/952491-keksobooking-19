'use strict';
var LEFT_MOUSE = 0;
var ENTER_KEY = 'Enter';
var PIN_WIDTH = 156;
var PIN_HEIGHT = 156;
var MAX_OBJECTS = 8;

var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTO = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var obj = [];
var map = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.ad-form');
/* Функция для генерации дополнительного массива
 * source - массив исходных данных
 * quantity - длина нового массива */
var generateArray = function (source, quantity) {
  var newArray = [];
  for (var i = 0; i < quantity; i++) {
    newArray.push(source[Math.floor(Math.random() * source.length)]);
  }
  return newArray;
};

/* Функция для генерации отдельного объекта предложения */
var generateNewObj = function (i) {
  var objModel = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
    },
    offer: {
      title: 'Новое объявление ' + i, // строка, заголовок предложения
      address: '',
      price: Math.floor(Math.random() * 10000), // число, стоимость
      type: HOUSING_TYPES[Math.floor(Math.random() * 3)], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      rooms: Math.floor(Math.random() * 10 + 1), // число, количество комнат
      guests: Math.floor(Math.random() * 100), // число, количество гостей, которое можно разместить
      checkin: CHECK_TIME[Math.floor(Math.random() * 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      checkout: CHECK_TIME[Math.floor(Math.random() * 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      features: generateArray(FEATURES, Math.floor(Math.random() * 6)), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: 'Описание предложения' + i, // строка с описанием,
      photos: generateArray(HOTEL_PHOTO, Math.floor(Math.random() * 5)), // массив строк случайной длины, содержащий адреса фотографий
    },
    location: {
      x: Math.floor(Math.random() * 1000 + 30),
      y: Math.floor(Math.random() * 400 + 130),
    },
  };
  objModel.offer.address = objModel.location.x + ', ' + objModel.location.y;
  return objModel;
};

// создание массива со случайными объектами
var createArray = function (array) {
  for (var i = 0; i < MAX_OBJECTS; i++) {
    array.push(generateNewObj(i + 1));
  }
  return array;
};

createArray(obj);

var createNewPin = function () {
  var fragment = document.createDocumentFragment();
  var similarPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');

  for (var i = 0; i < MAX_OBJECTS; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + obj[i].location.x + 'px; top: ' + obj[i].location.y + 'px;';
    pinElement.querySelector('img').src = obj[i].author.avatar;
    pinElement.querySelector('img').alt = obj[i].offer.title;
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var showNewPins = function () {
  var newPin = createNewPin();
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(newPin);
};


// ----Валидация----

// accept="image/png, image/jpeg"

var avatarInput = noticeForm.querySelector('#avatar');
avatarInput.setAttribute('accept', 'image/png, image/jpeg');

var imagesInput = noticeForm.querySelector('#images');
imagesInput.setAttribute('accept', 'image/png, image/jpeg');

var selectType = noticeForm.querySelector('#type');
//  Ограничения поля цены при изменении типа формы
var setPriceLengthLimit = function () {
  var price = noticeForm.querySelector('#price');
  switch (selectType.value) {
    case 'bungalo':
      price.setAttribute('min', '0');
      price.placeholder = '1000';
      break;
    case 'flat':
      price.setAttribute('min', '1000');
      price.placeholder = '1000';
      break;
    case 'house':
      price.setAttribute('min', '5000');
      price.placeholder = '5000';
      break;
    case 'palace':
      price.setAttribute('min', '10000');
      price.placeholder = '10000';
      break;
  }
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
      } else {
        capacity.setCustomValidity('');
      }
      break;
    }
    case '2': {
      if (capacity.value !== '1' || capacity.value !== '2') {
        capacity.setCustomValidity('Только для 1 или 2 гостей');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    }
    case '3': {
      if (capacity.value === '0') {
        capacity.setCustomValidity('Только для 1, 2 или 3 гостей');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    }
    case '100': {
      if (capacity.value !== '0') {
        capacity.setCustomValidity('Только не для гостей');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    }
  }
};

var setValidatorToForm = function () {
  guestInputValidation();
};

roomNumber.addEventListener('input', guestInputValidation);
noticeForm.querySelector('.ad-form__submit').addEventListener('click', setValidatorToForm);

// Получение адреса
var getAddress = function () {
  var x = Math.floor(parseInt(pinMain.style.left, 10) + PIN_WIDTH / 2);
  var y = Math.floor(parseInt(pinMain.style.top, 10) + PIN_HEIGHT);

  return x + ', ' + y;
};

/* Вставка адреса в поле формы */
var fillAddress = function () {
  noticeForm.querySelector('#address').setAttribute('readonly', '');
  noticeForm.querySelector('#address').value = getAddress();
};

var disableFormElement = function (selector) {
  noticeForm.querySelector(selector).setAttribute('disabled', '');
};

var activateFormElement = function (selector) {
  noticeForm.querySelector(selector).removeAttribute('disabled');
};

// Перевод элементов формы в положение disable
var disableForm = function () {
  disableFormElement('#avatar');
  disableFormElement('#title');
  disableFormElement('#address');
  disableFormElement('#type');
  disableFormElement('#price');
  disableFormElement('#timein');
  disableFormElement('#timeout');
  disableFormElement('#room_number');
  disableFormElement('#capacity');
  disableFormElement('.features');
  disableFormElement('#description');
  disableFormElement('#images');
  disableFormElement('.ad-form__submit');
  disableFormElement('.ad-form__reset');
};

/* Функция активации элементов страницы */
var activatePage = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  mainAttributes('#title', true, 30, 100);
  mainAttributes('#price', true, 1000, 1000000);
  fillAddress();
  showNewPins();
  activateFormElement('#avatar');
  activateFormElement('#title');
  activateFormElement('#address');
  activateFormElement('#type');
  activateFormElement('#price');
  activateFormElement('#timein');
  activateFormElement('#timeout');
  activateFormElement('#room_number');
  activateFormElement('#capacity');
  activateFormElement('.features');
  activateFormElement('#description');
  activateFormElement('#images');
  activateFormElement('.ad-form__submit');
  activateFormElement('.ad-form__reset');
};

/* Активация по нажатию мышью по метке */
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE) {
    activatePage();
  }
});

/* Активация по нажатию enter по метке */
pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

/* До активации страницы */
disableForm();
fillAddress();
