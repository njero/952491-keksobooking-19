'use strict';

// Модуль формы объявления
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var StatusCode = {
    OK: 200
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.response === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

})();
