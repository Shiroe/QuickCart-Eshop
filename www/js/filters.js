angular.module('starter.filters', [])

.filter('float', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return parseInt( (input - Math.floor(input)) * 100);
    };
})

.filter('integer', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return parseInt(Math.floor(input));
    };
});
