angular.module('starter.controllers', [])

.controller('LoginCtrl', function($rootScope, $scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {
	$rootScope.showFBbtn = true;
	$scope.getFBbtn = function(){
		if($rootScope.showFBbtn){
			return true;
		}else{
			return false;
		}
	};

	//$scope.showFBbtn = $rootScope.showFBbtn;
	$scope.$on('$ionicView.enter', function(e) {
		$scope.inputHeight = 55;
		$scope.inputmaskClass = 'input-mask';
		$scope.contentHeight =  0+'px';
		$scope.imgContentHeight = 0+'px';
		$scope.read=true;
		$scope.hideKeyboardTimer;
		$scope.loginact = false;
	});
	console.log($rootScope.showFBbtn);
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

	$scope.fblogin = function(){
		//$ionicViewSwitcher.nextDirection('forward');
		$state.go('fblogin');
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
.controller('fbLoginCtrl', function($rootScope, $scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {

	$scope.answer = function(num){
		console.log(num);
		var x = parseInt(num);
		if(x == 1){
			$rootScope.showFBbtn = false;
			$state.go('login');
		}else{
			$state.go('register');
		}
	};

})
.controller('RegisterCtrl', function($rootScope, $scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {

	$scope.$on('$ionicView.enter', function(e) {
		$scope.inputHeight = 55;
		$scope.inputmaskClass = 'input-mask';
		$scope.contentHeight =  0+'px';
		$scope.imgContentHeight = 0+'px';
		$scope.read=true;
		$scope.hideKeyboardTimer;
		$scope.loginact = false;
	});
	//console.log($rootScope.showFBbtn);
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

	$scope.registerData = {};

	$scope.register = function(){
		console.log($scope.registerData);
		if($scope.registerData.username && $scope.registerData.password && $scope.registerData.firstname && $scope.registerData.surname){
			if($scope.registerData.password == $scope.registerData.password2){
				$rootScope.showFBbtn = false;
				$state.go('login');
			}else{
				console.log('Passwords do not match!');
			}
		}else{
			console.log('Not all fields are filled!');
		}
	};

})
.controller('DashCtrl', function($scope, $state, $ionicViewSwitcher, $ionicModal, $timeout, $ionicPlatform,$ionicLoading,focus,$window) {

	$scope.showQuickCart = function(){
		$state.go('app.qcart');
	};


})
.controller('QcartCtrl', function($scope, $ionicViewSwitcher, $state, $ionicModal, $timeout, $server, Cart) {
	//$scope.size = "Small";
	//$scope.products=[1,2,3,4,5,6,7,8,9,10,11];

	$scope.cart = Cart.getProducts(); //JSON.stringify(Cart.getProducts());
	$scope.chunk = function(arr, size){
		var newArr = [];
			for (var i=0; i<arr.length; i+=size) {
				newArr.push(arr.slice(i, i+size));
			}
			return newArr;
	};

	var data = $server.login();
	$scope.products = $scope.chunk(data.user_products, 2);

	//console.log($scope.cart);

	$scope.showOffers = function(){
		$state.go('app.offers');
	};

	$scope.discountBadge = function(product){
		var discount = 0;
		discount = ((product.regular_price - product.price)/ product.regular_price);
		return discount;
	};


	$ionicModal.fromTemplateUrl('templates/cart.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-right-left'
    });

	$scope.showEditProduct = function(product){
		var selectedProd = angular.copy(product);
		$ionicModal.fromTemplateUrl('templates/editProduct.html', function($ionicModal) {
					$scope.editProduct={
						btnColor : 'add',
						btnTitle : 'Add to cart',
						action : 'add'
					};
					$scope.productEdit = $ionicModal;

	    }, {
	        // Use our scope for the scope of the modal to keep it simple
	        scope: $scope,
	        // The animation we want to use for the modal entrance
	        animation: 'scale-in'
	    }).then(function(modal) {

			$scope.productEdit.show();
			$scope.quantity = 1;
			$scope.size = "Small";
			//console.log($scope.quantity);
			$scope.product = selectedProd;
		});
	};


})
.controller('OffersCtrl', function($scope, $ionicViewSwitcher, $state, $ionicModal, $timeout, $server, Cart) {

	$scope.cart = Cart.getProducts();
	var data = $server.login();
	$scope.products = data.user_products;
	console.log(data);

	$scope.discountBadge = function(product){
		var discount = 0;
		discount = ((product.regular_price - product.price)/ product.regular_price);
		return discount;
	};

	$scope.showCheckout = function(){
		$state.go('app.checkout');
	};

	$ionicModal.fromTemplateUrl('templates/cart.html', function($ionicModal) {
				$scope.modal = $ionicModal;
		}, {
				// Use our scope for the scope of the modal to keep it simple
				scope: $scope,
				// The animation we want to use for the modal entrance
				animation: 'slide-right-left'
		});

		$scope.showEditProduct = function(product){
			var selectedProd = angular.copy(product);
			$ionicModal.fromTemplateUrl('templates/editProduct.html', function($ionicModal) {
						$scope.editProduct={
							btnColor : 'add',
							btnTitle : 'Add to cart',
							action : 'add'
						};
						$scope.productEdit = $ionicModal;

		    }, {
		        // Use our scope for the scope of the modal to keep it simple
		        scope: $scope,
		        // The animation we want to use for the modal entrance
		        animation: 'scale-in'
		    }).then(function(modal) {

				$scope.productEdit.show();
				$scope.quantity = 1;
				//console.log($scope.quantity);
				$scope.product = selectedProd;
			});
		}

})
.controller('checkoutCtrl', function($timeout, $scope, $ionicHistory, $ionicViewSwitcher, $state, $ionicModal, $timeout, Cart) {

	$scope.cart = Cart.getProducts();
	$scope.products = $scope.cart.products;
	$scope.user = {};
	$scope.user.addresses = [{
				"name":"Work",
				"default":true,
				"country":"Greece",
				"state":"Attika",
				"city":"N. Iraklio",
				"zipcode":"14122",
				"street":"Irakliou Ave",
				"number":"313",
				"flour":2,
				"notes":"some notes for the work"
			},{
				"name":"Home",
				"default":false,
				"country":"Not Greece",
				"state":"Not Attika",
				"city":"Not N. Iraklio",
				"zipcode":"14122",
				"street":"Not Irakliou Ave",
				"number":"312",
				"flour":2,
				"notes":"Not some notes for the home"
			}];
	$scope.fbs = 10;
	$scope.calculateTotal = function(temptotal, fbs){
		var total = 0;
		total = temptotal - fbs;
		return parseInt(total);
	};

	$scope.notEnough = function(total){
		if(total < 25){
			return true;
		}else{
			return false;
		}
	};

	$scope.redirect = function(){
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.thankyou');
	};

	$scope.getTotal = function(product){
		var total = 0;
		total += (product.price * product.selected_attributes.count);
		return total;
	}

	$scope.deleteItem = function(product){
		//console.log("deleting" + product);
		Cart.remove(product);
	}

	$scope.removeCount = function(product){
		if(product.selected_attributes.count > 1){
			product.selected_attributes.count -= 1;
			Cart.updateCount(product);
		}else{
		}
	};

	$scope.addCount = function(product){
		product.selected_attributes.count += 1;
		Cart.updateCount(product);
	};


	$scope.paymentMethod = 1;//card



})

.controller('OrdersCtrl', function($scope, $state, $server, Orders ) {

	var data = Orders.All();
	$scope.orders = data.orders;
	console.log($scope.orders);
	$scope.viewOrder = function(orderId){
		$state.go('app.order', { orderId :orderId});
	};

})
.controller('OrderCtrl', function($scope, $stateParams, Orders) {
	var orderId = $stateParams.orderId;

	$scope.order = Orders.One(orderId);
	console.log("scope order:", $scope.order);

	var data = $scope.order.products;
	$scope.getTotal = function(product){
		var total = 0;
		total += (product.price * product.selected_attributes.count);
		return total;
	};

	$scope.chunk = function(arr, size){
		var newArr = [];
			for (var i=0; i<arr.length; i+=size) {
				newArr.push(arr.slice(i, i+size));
			}
			return newArr;
	};
	$scope.products = $scope.chunk(data,2);

})

.controller('repeatOrderCtrl', function($scope, $stateParams, $ionicModal, Orders) {

   var data = Orders.All();
	 $scope.orders = data.orders[0];

	$scope.getTotal = function(product){
		var total = 0;
		total += (product.price * product.selected_attributes.count);
		return total;
	}

	$scope.chunk = function(arr, size){
		var newArr = [];
			for (var i=0; i<arr.length; i+=size) {
				newArr.push(arr.slice(i, i+size));
			}
			return newArr;
	};
	 $scope.order = $scope.chunk($scope.orders.products, 2);

	console.log($scope.orders);

		$scope.showEditProduct = function(product){
			var selectedProd = angular.copy(product);
			$ionicModal.fromTemplateUrl('templates/editProduct.html', function($ionicModal) {
						$scope.editProduct={
							btnColor : 'orange',
							btnTitle : 'Change',
							action: 'change'
						};
						$scope.productEdit = $ionicModal;
				}, {
						// Use our scope for the scope of the modal to keep it simple
						scope: $scope,
						// The animation we want to use for the modal entrance
						animation: 'scale-in'
				}).then(function(modal) {

				$scope.productEdit.show();
				$scope.quantity = selectedProd.selected_attributes.count;
				console.log(selectedProd.selected_attributes.size);
				$scope.size = selectedProd.selected_attributes.size;
				//console.log($scope.quantity);
				$scope.product = selectedProd;
				console.log($scope.product);
			});
	};
})

.controller('editProductCtrl', function($scope, $ionicViewSwitcher, $state, $ionicModal, $timeout, Cart) {

	$scope.$watch("product", function (newVal) {
		if((newVal.selected_attributes === undefined ) || (newVal.selected_attributes === null)){
			$scope.product_options_size = newVal.attributes[0];
			$scope.size_changed(newVal.attributes[0].size);
			$scope.designSelected(newVal.attributes[0].designs[0]);
		}else{
			angular.forEach(newVal.attributes, function(value, key){
				if((value.size === newVal.selected_attributes.size)){
					$scope.product_options_size = newVal.attributes[key];
					$scope.size_changed(newVal.attributes[key].size);
					angular.forEach(newVal.attributes[key].designs, function(x, y){
						if(x.id === newVal.selected_attributes.design.id){
							$scope.designSelected(newVal.attributes[key].designs[y]);
						}
					})
				}
			})
		}
	})

	$scope.size_changed = function(selected){
		var attrs = angular.fromJson($scope.product.attributes);
		angular.forEach(attrs, function(value, key){
			if(value['size'] == selected){
				$scope.current_designs = attrs[key].designs;
			}
		})
		$scope.size = selected;
	};

	$scope.designSelected = function(selected){
			console.log(selected);
			$scope.selected = selected;
    	$scope.selectedDesign = selected;
	};

	$scope.isActive = function(selected){
		return $scope.selected === selected;
	};

	$scope.addToCart = function(){
			var productToAdd = $scope.product;
			productToAdd.attributes = $scope.product.attributes;
			productToAdd.selected_attributes = {};
			productToAdd.selected_attributes.size = $scope.size;
			productToAdd.selected_attributes.design = $scope.selectedDesign;
			productToAdd.selected_attributes.count = $scope.quantity;
			productToAdd.uniqueTag = productToAdd.product_id.toString() + productToAdd.selected_attributes.size + productToAdd.selected_attributes.design.id.toString();
			console.log(productToAdd.uniqueTag);
			Cart.add(productToAdd);
			$scope.productEdit.hide();
	};

	/*$scope.action = function(action){
		if(action === 'add'){
			addToCart();
		}else{
			updateProduct();
		}
	};*/

	$scope.updateProduct = function(){

	};

	$scope.removeCount = function(){
		if($scope.quantity > 1){
			$scope.quantity -= 1;
		}else{
			//do nothing
		}
	};

	$scope.addCount = function(){
		$scope.quantity += 1;
	};

})

.controller('AppCtrl', function($rootScope, $scope, $ionicViewSwitcher, $state, $ionicModal, $timeout, User) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {

  });

  $rootScope.user_score = User.getScore();
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
		$rootScope.showFBbtn = true;
		$state.go('login');
    //$scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  /*$scope.doLogout = function() {
    console.log('Doing login', $scope.loginData);
	$scope.login();
  };*/
})

.controller('CartCtrl', function($scope, $state, Cart) {

	$scope.cart = Cart.getProducts();

	$scope.getTotal = function(product){
    var total = 0;
  	total += (product.price * product.selected_attributes.count);
    return total;
	}

	$scope.getRegularTotal = function(product){
		var total = 0;
		total += (product.regular_price * product.selected_attributes.count);
		return total;
	}

	$scope.deleteItem = function(product){
		//console.log("deleting" + product);
		Cart.remove(product);
	}

	$scope.removeCount = function(product){
		if(product.selected_attributes.count > 1){
			product.selected_attributes.count -= 1;
			Cart.updateCount(product);
		}else{
		}
	};

	$scope.addCount = function(product){
		product.selected_attributes.count += 1;
		Cart.updateCount(product);
	};

	$scope.Close = function(){
		console.log($scope.cart);
	}

	$scope.showCheckout = function(){
		$scope.modal.hide();
		$state.go('app.checkout');
	};


})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('thankyouCtrl', function($scope, $stateParams, User) {
  $scope.user = {};
  $scope.user = User.getScore();
  $scope.user.activeClass = User.getActiveClass($scope.user.discount_level);
  $scope.user.img = User.getImgBadge($scope.user.discount_level);

})

.controller('scoreCtrl', function($scope, $timeout, User) {
  angular.element(document).ready(function () {
        $timeout(function(){
          var windowHeight = jQuery(window).height();
          var bottomHeight = windowHeight - jQuery('#score-wrap').outerHeight() - jQuery('ion-header-bar').outerHeight() - jQuery('.bar-footer').outerHeight();
          console.log('window' + windowHeight + '#score-wrap' + jQuery('user-score').height() + 'ion-header-bar' + jQuery('ion-header-bar').height() + '.bar-footer' + jQuery('.bar-footer').height());
          jQuery('.bottom-section').height(bottomHeight);
	  }, 100);
    });
})

.controller('ProfileCtrl', function($scope, User) {

});
