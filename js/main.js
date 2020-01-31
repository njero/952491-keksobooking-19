'use strict';
var OBJ_NUMBER = 8;

var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var objArray = [];

//  функция для генерации массива с дополнениями
var generateFeaturesArray = function () {
  var newFeaturesArray = [];
  var featuresNumber = Math.floor(Math.random() * 5); // количество дополнений
  for (var i = 0; i < featuresNumber; i++) {
    newFeaturesArray.push(FEATURES[Math.floor(Math.random() * 6)]);
  }
  return newFeaturesArray;
};

//  функция для генерации массива с адресами фотографий
var generatePhotoArray = function () {
  var newPhotoArray = [];
  var photoNumber = Math.floor(Math.random() * 5); // количество фотографий
  for (var i = 0; i < photoNumber; i++) {
    newPhotoArray.push(HOTEL_PHOTO[Math.floor(Math.random() * 3)]);
  }
  return newPhotoArray;
};

// функция для генерации отдельного объекта предложения
var generateNewObj = function (i) {
  var obgModel = {
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
      features: generateFeaturesArray(), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: 'Описание предложения' + i, // строка с описанием,
      photos: generatePhotoArray(), // массив строк случайной длины, содержащий адреса фотографий
    },
    location: {
      x: Math.floor(Math.random() * 1000 + 30),
      y: Math.floor(Math.random() * 400 + 130),
    },
  };
  obgModel.offer.address = obgModel.location.x + ', ' + obgModel.location.y;
  return obgModel;
};

// создание массива со случайными объектами
var createArray = function (array) {
  for (var i = 0; i < OBJ_NUMBER; i++) {
    array.push(generateNewObj(i + 1));
  }
  return array;
};

createArray(objArray);

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var createNewPin = function () {
  var fragment = document.createDocumentFragment();
  var similarPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');

  for (var i = 0; i < OBJ_NUMBER; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + objArray[i].location.x + 'px; top: ' + objArray[i].location.y + 'px;';
    pinElement.querySelector('img').src = objArray[i].author.avatar;
    pinElement.querySelector('img').alt = objArray[i].offer.title;
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var newPin = createNewPin();
var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(newPin);
