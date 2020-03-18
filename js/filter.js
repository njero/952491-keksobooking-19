'use strict';
(function () {
  var PriceRange = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    height: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var Filters = {
    type: filter.querySelector('#housing-type'),
    price: filter.querySelector('#housing-price'),
    rooms: filter.querySelector('#housing-rooms'),
    guests: filter.querySelector('#housing-guests'),
    features: filter.querySelector('#housing-features'),

  };

  var offers = [];
  var filteredOffers = [];


  var filtrationItem = function (el, item, key) {
    return el.value === 'any' ? true : el.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(Filters.type, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceRange[Filters.price.value];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filtrationItem(Filters.rooms, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filtrationItem(Filters.guests, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = Filters.features.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.utils.debounce(function () {
    filteredOffers = offers;
    filteredOffers = filteredOffers.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.pin.remove();
    window.card.remove();
    window.map.showPins(filteredOffers);
  });

  var resetFilter = function () {
    Filters.forEach(function (el) {
      el.value = 'any';
    });
    var featuresItems = Filters.features.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilters = function () {
    Filters.forEach(function (el) {
      el.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFilters = function (data) {
    offers = data.slice(0);
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
    return data.slice(0);
  };

  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
