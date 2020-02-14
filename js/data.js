'use strict';

// Модуль создания данных для меток
(function () {

  var MAX_OBJECTS = 8;

  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_PHOTO = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

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
  var createCards = function () {
    var objects = [];
    for (var i = 0; i < MAX_OBJECTS; i++) {
      objects.push(generateNewObj(i + 1));
    }
    return objects;
  };

  var cards = createCards();

  var getData = function () {
    return cards;
  };

  window.data = {
    HOUSING_TYPES: HOUSING_TYPES,
    MAX_OBJECTS: MAX_OBJECTS,
    cards: cards,
    get: getData,
  };

})();
