/*angular.module('starter.directives', []);*/
angular.module("starter.directives", []).factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var eleme = $window.document.getElementById(id);
		console.log(eleme);
        if(eleme)
          eleme.focus();
      });
    };
  });