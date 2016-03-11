angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {
	
	$scope.$on('$ionicView.enter', function(e) {
		$scope.inputHeight = 55;
		$scope.inputmaskClass = 'input-mask';
		$scope.contentHeight =  0+'px';
		$scope.imgContentHeight = 0+'px';
		$scope.read=true;
		$scope.hideKeyboardTimer;
		$scope.loginact = false;
	});
	
	$scope.inputDidFocus = function (inp){
	    $scope.contentHeight =  220+'px';
		$scope.imgContentHeight = 110+'px';
		$scope.inputmaskClass = 'input-mask hidden';
	    $timeout(function(){$scope.inputFocus(inp);}, 5);
	}
	$scope.inputFocus = function (inp){
		$scope.read=false;
		$timeout(function(){
			focus(inp);
		},650);
	}
	
	
	window.addEventListener('native.keyboardshow', function(e){
		$scope.keyboardShowHandler(e);
	    $scope.contentHeight =  e.keyboardHeight+'px';
		$scope.imgContentHeight = (e.keyboardHeight/2.0)+'px';
	    $scope.$digest();
	});
	
	$scope.keyboardShowHandler = function(e){
	    $timeout.cancel($scope.hideKeyboardTimer);
	};
	
	// This event fires when the keyboard will hide
	
	window.addEventListener('native.keyboardhide',  function(e){
		$scope.hideKeyboardTimer = $timeout(function() { $scope.keyboardHideHandler(e); }, 100);
		
	});
	
	$scope.keyboardHideHandler = function(e){
	    //console.log('Goodnight, sweet prince');
	    if(!$scope.loginact){ 
		    $scope.contentHeight =  '0px';
		    $scope.imgContentHeight = 0+'px';
		}
	    else $scope.loginact = false;
		$scope.inputmaskClass = 'input-mask';
	    $scope.$digest();
	};
	
	
	
	
	$scope.login = function(){
		// Setup the loader
		$scope.loginact = true;
		/*$ionicLoading.show({
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 300,
		    showDelay: 0
		});*/
		//$timeout(function() {
		$ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
		$state.go('app.dashboard');
			//$ionicLoading.hide();
		//}, 5000);
	};
	
})
.controller('DashCtrl', function($scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {
	$scope.showQuickCart = function(){
		$state.go('app.qcart');   
		/*window.plugins.nativepagetransitions.slide(
		  {"direction":"up"},
		  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
		  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
		);*/
	};
	
	
})
.controller('QcartCtrl', function($scope, $ionicViewSwitcher, $state, $ionicModal, $timeout) {
	$scope.products=[1,2,3,4,5,6,7,8,9,10,11];
})
.controller('AppCtrl', function($scope, $ionicViewSwitcher, $state, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  
  });
	
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'none'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.logout = function() {
		//$ionicViewSwitcher.nextDirection('slide-up'); // 'forward', 'back', etc.
		$state.go('login');
    //$scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  /*$scope.doLogout = function() {
    console.log('Doing login', $scope.loginData);
	$scope.login();
  };*/
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});