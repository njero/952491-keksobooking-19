'use strict';
(function () {

  var pinMain = document.querySelector('.map__pin--main');

  var onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  var onLoadSuccess = function (data) {
    window.filter.activate(data);
  };

  /* Функция активации элементов страницы */
  var activatePage = function () {
    window.serverData.load(onLoadSuccess, onLoadError);
    window.map.element.classList.remove('map--faded');
    window.form.activate();
    pinMain.removeEventListener('mouseup', onMainPinMouseUp);
    pinMain.removeEventListener('keydown', onMainPinEnterDown);
  };

  var onMainPinMouseUp = function (evt) {
    if (evt.button === window.utils.MouseCode.LEFT) {
      activatePage();
    }
  };

  var onMainPinEnterDown = function (evt) {
    if (evt.key === window.utils.KeyboardCode.ENTER) {
      activatePage();
    }
  };

  var reset = function () {
    /* Активация по нажатию мышью по метке */
    pinMain.addEventListener('mouseup', onMainPinMouseUp);
    /* Активация по нажатию enter по метке */
    pinMain.addEventListener('keydown', onMainPinEnterDown);
  };

  window.activate = {
    reset: reset
  };

})();
