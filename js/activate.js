'use strict';
(function () {

  var LEFT_MOUSE = 0;
  var ENTER_KEY = 'Enter';
  var pinMain = document.querySelector('.map__pin--main');

  /* Функция активации элементов страницы */
  var activatePage = function () {
    window.map.element.classList.remove('map--faded');
    window.form.notice.classList.remove('ad-form--disabled');
    window.form.mainAttributes('#title', true, 30, 100);
    window.form.mainAttributes('#price', true, 1000, 1000000);
    window.form.fillAddress();
    window.map.showPins();
    window.form.changeAbility(true);
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
  window.form.changeAbility(false);
  window.form.fillAddress();
})();