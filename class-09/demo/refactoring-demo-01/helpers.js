'use strict';

const utilities = {};
utilities.randomNumberBetween = function(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

utilities.userName = 'Razan';
console.log(utilities);
module.exports = utilities