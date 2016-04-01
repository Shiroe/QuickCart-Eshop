angular.module("starter.services", [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.service('$server',['$localstorage', function($localstorage) {
  this.connect = function functionName(user_id,token) {
    return true;
  }
  this.login = function functionName(email,password) {
    return true;
  }
  this.order = function functionName(order_id) {
    return true;
  }
  this.product_price_check = function functionName(id_list) {
    return true;
  }
}])

.service('$data',['$localstorage', function($localstorage) {

}]);
