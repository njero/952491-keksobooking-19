'use strict';
(function () {

  var pinMain = document.querySelector('.map__pin--main');


  /* Функция активации элементов страницы */
  var activatePage = function () {
    window.map.element.classList.remove('map--faded');
    window.form.activate();
    window.map.showPins();
  };

  /* Активация по нажатию мышью по метке */
  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utils.MouseCode.LEFT) {
      activatePage();
    }
  });

  /* Активация по нажатию enter по метке */
  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.KeyboardCode.ENTER) {
      activatePage();
    }
  });

})();
