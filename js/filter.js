'use strict';
(function () {
  var MAX_OFFERS = 5;

  var PriceRange = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filters = {
    type: filter.querySelector('#housing-type'),
    price: filter.querySelector('#housing-price'),
    rooms: filter.querySelector('#housing-rooms'),
    guests: filter.querySelector('#housing-guests'),
    features: filter.querySelector('#housing-features'),
  };

  var offers = [];
  var filteredOffers = [];


  var filterItem = function (el, item, key) {
    return el.value === 'any' || el.value === item[key].toString();
  };

  var filterByType = function (item) {
    return filterItem(filters.type, item.offer, 'type');
  };

  var filterByPrice = function (item) {
    var filteringPrice = PriceRange[filters.price.value];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filterByRooms = function (item) {
    return filterItem(filters.rooms, item.offer, 'rooms');
  };

  var filterByGuests = function (item) {
    return filterItem(filters.guests, item.offer, 'guests');
  };

  var filterByFeatures = function (item) {
    var checkedFeaturesItems = filters.features.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.utils.debounce(function () {
    filteredOffers = [];
    for (var i = 0; i < offers.length && filteredOffers.length < MAX_OFFERS; i++) {
      if (filterByType(offers[i]) && filterByPrice(offers[i]) && filterByRooms(offers[i]) && filterByGuests(offers[i]) && filterByFeatures(offers[i])) {
        filteredOffers.push(offers[i]);
      }
    }
    window.pin.remove();
    window.card.remove();
    window.map.showPins(filteredOffers);
  });

  var resetFilter = function () {

    for (var key in filters) {
      if (filters[key]) {
        filters[key].value = 'any';
      }
    }
    var featuresItems = filters.features.querySelectorAll('input:checked');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivatefilters = function () {
    for (var key in filters) {
      if (filters[key]) {
        filters[key].disabled = true;
      }
    }
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFilters = function (data) {
    for (var key in filters) {
      if (filters[key]) {
        filters[key].disabled = false;
      }
    }
    offers = data.slice(0);
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
    return data.slice(0);
  };

  window.filter = {
    activate: activateFilters,
    deactivate: deactivatefilters
  };
})();
