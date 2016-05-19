/*angular.module('starter.directives', []);*/
angular.module("starter.directives", [])
.factory('focus', function($timeout, $window) {
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
  })
.factory('ScorePieHtml', function($http){
      var ScorePieHtml = {};

      ScorePieHtml.loadData = function(){
        return $http.get('/templates/pie-score.html');
      }

      return ScorePieHtml;
})
// .directive('parentDirective', function(ScorePieHtml, User, $compile){
//       return {
//           restrict: 'E',
//           link: function(scope, elem, attrs){
//           ScorePieHtml.loadData().then(function(result){
//               User.getScore().then(function(data){
//                   scope.score = data;
//               })
//               console.log('RESULT', result);
//               scope.data = result.data;
//               var htm = scope.data;//'<child-directive></child-directive>';
//               var compiled = $compile(htm)(scope);
//               elem.append(compiled);
//           });
//         }
//       }
// })
.directive('userScore', function(ScorePieHtml, User, $compile){
    return {
        restrict: 'E',
        link: function(scope, elem, attrs){
        ScorePieHtml.loadData().then(function(result){
            var data = User.getScore();
            scope.score = data;

            console.log('RESULT', result);
            console.log('user score', scope.score);
            scope.data = result.data;
            var htm = scope.data;//'<child-directive></child-directive>';
            var compiled = $compile(htm)(scope);
            elem.append(compiled);
        });
      }
    }
});
