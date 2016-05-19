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

.factory('User', ['$http', function($http){
    var user = {
        'user_score_details': {
            'discount_level': 5,
            'discount_percentage':'10%',
            'img': '',
            'days_left': 30,
            'points_left': '100',
            'money_to_promote': '150'
        },
    };
    var imageBadges = [
        {'path': '../img/heart.png'},
        {'path': '../img/diamond.png'},
        {'path': '../img/shield.png'},
        {'path': '../img/rocket.png'},
        {'path': '../img/unicorn.png'},
        {'path': '../img/diamond.png'},
    ];
    var getImgBadge = function(activeLevel){
        return imageBadges[activeLevel - 1].path;
    }

    var getActiveClass = function(activeLevel){
        if (activeLevel == '1') {
          return 'level-1';
        }
        else if (activeLevel == '2') {
          return 'level-1 level-2';
        }
        else if (activeLevel == '3') {
          return 'level-1 level-2 level-3';
        }
        else if (activeLevel == '4') {
          return 'level-1 level-2 level-3 level-4';
        }
        else if (activeLevel == '5') {
          return 'level-1 level-2 level-3 level-4 level-5';
        }
        else if (activeLevel == '6') {
          return 'level-1 level-2 level-3 level-4 level-5 level-6';
        }
    }

    var getScore = function(){
        return user.user_score_details;
    };

    return {
        getScore: getScore,
        getActiveClass: getActiveClass,
        getImgBadge: getImgBadge
    }
}])

.factory('Cart', [function(){
  var cart_data = { "products": [], "total": 0, "count": 0};

  var getProducts = function(){
    return cart_data;
  };

  var updateCount = function(product){
    angular.forEach(cart_data.products, function(value, key){
			if(value === product){
        cart_data.products[key].selected_attributes.count = product.selected_attributes.count;
			}
		})
    calculate();
  };
  var add = function(tempproduct){
    var product = angular.copy(tempproduct);
    if(cart_data.products.length<1){
      cart_data.products.push(product);
    }else{
      var exist = false;
      angular.forEach(cart_data.products, function(value, key){
  			if((!exist)&&(cart_data.products[key].uniqueTag === product.uniqueTag)){
          cart_data.products[key].selected_attributes.count += product.selected_attributes.count;
          exist = true;
        }
  		});
      if(!exist){
         cart_data.products.push(product);
       }
    }
    calculate();
  };

  var remove = function(product){
     angular.forEach(cart_data.products, function(value, key){
     			if(value === product){
             cart_data.products.splice(cart_data.products.indexOf(product), 1);
     			}
      })
      calculate();
  };

  var removeAll = function(){
    cart_data = { "products": [{}], "total": 0, "count": 0};
  };
  var calculate = function(){
    var cc = 0;
    var tt = 0;
    for(var i=0; i<cart_data.products.length; i++){
      tt += (cart_data.products[i].selected_attributes.count * cart_data.products[i].price);
      cc += cart_data.products[i].selected_attributes.count;
    }
    cart_data.total = tt;
    cart_data.count = cc;
  };

  return {
    removeAll: removeAll,
    remove: remove,
    add: add,
    getProducts: getProducts,
    updateCount: updateCount
  }
}])

.factory('Orders', function($http, $server){
  var orders =
  {
     "orders": [
    {
     "order_id": 1,
     "date": "01-01-2016+13:20",
     "repeat_available": true,
     "shipped": "07-01-2016+12:20",
     "order_status": "order_status",
     "total": 121.5,
     "count": 9,
     "products": [
        {
              "product_id":1,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":11.50,
              "regular_price":21.12,
              "selected_attributes": {
                "size": "Small",
                "count": 2,
                "design":{
                  "id": 2,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_2"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
            }
            ]},
        {
              "product_id":2,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":12.50,
              "regular_price":22.12,
              "selected_attributes": {
                "size": "Small",
                "count": 1,
                "design":{
                  "id": 1,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_1"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":3,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":13.50,
              "regular_price":23.12,
              "selected_attributes": {
                "size": "Large",
                "count": 2,
                "design":{
                  "id": 3,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":4,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":14.50,
              "regular_price":24.12,
              "selected_attributes": {
                "size": "Medium",
                "count": 3,
                "design":{
                  "id": 5,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              }
              ]
              },
        {
                  "product_id":5,
                  "category":["shampoo","diapers"],
                  "name":"Name of the product",
                  "img":"img/pufies-pack.png",
                  "price":15.50,
                  "regular_price":25.12,
                  "selected_attributes": {
                    "size": "Medium",
                    "count": 1,
                    "design":{
                      "id": 4,
                      "img": "img/design_1.png",
                      "name":"name of the design",
                      "slug": "design_3"
                    }
                  },
                  "attributes":[
                    {
                      "size":"Small",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                      "size":"Medium",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                    "size":"Large",

                    "designs":[
                      {
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_1",
                        "id" : 1
                      },{
                        "name":"name of design",
                        "img":"img/design_1.png",
                        "slug":"design_2",
                        "id" : 2
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 3
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 4
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 5
                      }
                    ]
                  }]
                }
      ]
    },
      {
     "order_id": 2,
     "date": "10-01-2016+12:20",
     "repeat_available": false,
     "shipped": "17-01-2016+12:20",
     "order_status": "completed",
     "total": 121.5,
     "count": 9,
     "products": [
        {
              "product_id":1,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":11.50,
              "regular_price":21.12,
              "selected_attributes": {
                "size": "Small",
                "count": 2,
                "design":{
                  "id": 2,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_2"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
            }
            ]},
        {
              "product_id":2,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":12.50,
              "regular_price":22.12,
              "selected_attributes": {
                "size": "Small",
                "count": 1,
                "design":{
                  "id": 1,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_1"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":3,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":13.50,
              "regular_price":23.12,
              "selected_attributes": {
                "size": "Large",
                "count": 2,
                "design":{
                  "id": 3,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":4,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":14.50,
              "regular_price":24.12,
              "selected_attributes": {
                "size": "Medium",
                "count": 3,
                "design":{
                  "id": 5,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              }
              ]
              },
        {
                  "product_id":5,
                  "category":["shampoo","diapers"],
                  "name":"Name of the product",
                  "img":"img/pufies-pack.png",
                  "price":15.50,
                  "regular_price":25.12,
                  "selected_attributes": {
                    "size": "Medium",
                    "count": 1,
                    "design":{
                      "id": 4,
                      "img": "img/design_1.png",
                      "name":"name of the design",
                      "slug": "design_3"
                    }
                  },
                  "attributes":[
                    {
                      "size":"Small",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                      "size":"Medium",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                    "size":"Large",

                    "designs":[
                      {
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_1",
                        "id" : 1
                      },{
                        "name":"name of design",
                        "img":"img/design_1.png",
                        "slug":"design_2",
                        "id" : 2
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 3
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 4
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 5
                      }
                    ]
                  }]
                }
      ]
    },
      {
     "order_id": 3,
     "date": "20-01-2016+14:20",
     "repeat_available": true,
     "shipped": "27-01-2016+15:20",
     "order_status": "completed",
     "total": 121.5,
     "count": 9,
     "products": [
        {
              "product_id":1,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":11.50,
              "regular_price":21.12,
              "selected_attributes": {
                "size": "Small",
                "count": 2,
                "design":{
                  "id": 2,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_2"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
            }
            ]},
        {
              "product_id":2,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":12.50,
              "regular_price":22.12,
              "selected_attributes": {
                "size": "Small",
                "count": 1,
                "design":{
                  "id": 1,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_1"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":3,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":13.50,
              "regular_price":23.12,
              "selected_attributes": {
                "size": "Large",
                "count": 2,
                "design":{
                  "id": 3,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":4,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":14.50,
              "regular_price":24.12,
              "selected_attributes": {
                "size": "Medium",
                "count": 3,
                "design":{
                  "id": 5,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              }
              ]
              },
        {
                  "product_id":5,
                  "category":["shampoo","diapers"],
                  "name":"Name of the product",
                  "img":"img/pufies-pack.png",
                  "price":15.50,
                  "regular_price":25.12,
                  "selected_attributes": {
                    "size": "Medium",
                    "count": 1,
                    "design":{
                      "id": 4,
                      "img": "img/design_1.png",
                      "name":"name of the design",
                      "slug": "design_3"
                    }
                  },
                  "attributes":[
                    {
                      "size":"Small",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                      "size":"Medium",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                    "size":"Large",

                    "designs":[
                      {
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_1",
                        "id" : 1
                      },{
                        "name":"name of design",
                        "img":"img/design_1.png",
                        "slug":"design_2",
                        "id" : 2
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 3
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 4
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 5
                      }
                    ]
                  }]
                }
      ]
    },
      {
     "order_id": 4,
     "date": "07-02-2016+13:20",
     "repeat_available": false,
     "shipped": "17-02-2016+10:20",
     "order_status": "completed",
     "total": 121.5,
     "count": 9,
     "products": [
        {
              "product_id":1,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":11.50,
              "regular_price":21.12,
              "selected_attributes": {
                "size": "Small",
                "count": 2,
                "design":{
                  "id": 2,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_2"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
            }
            ]},
        {
              "product_id":2,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":12.50,
              "regular_price":22.12,
              "selected_attributes": {
                "size": "Small",
                "count": 1,
                "design":{
                  "id": 1,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_1"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":3,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":13.50,
              "regular_price":23.12,
              "selected_attributes": {
                "size": "Large",
                "count": 2,
                "design":{
                  "id": 3,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":4,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":14.50,
              "regular_price":24.12,
              "selected_attributes": {
                "size": "Medium",
                "count": 3,
                "design":{
                  "id": 5,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              }
              ]
              },
        {
                  "product_id":5,
                  "category":["shampoo","diapers"],
                  "name":"Name of the product",
                  "img":"img/pufies-pack.png",
                  "price":15.50,
                  "regular_price":25.12,
                  "selected_attributes": {
                    "size": "Medium",
                    "count": 1,
                    "design":{
                      "id": 4,
                      "img": "img/design_1.png",
                      "name":"name of the design",
                      "slug": "design_3"
                    }
                  },
                  "attributes":[
                    {
                      "size":"Small",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                      "size":"Medium",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                    "size":"Large",

                    "designs":[
                      {
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_1",
                        "id" : 1
                      },{
                        "name":"name of design",
                        "img":"img/design_1.png",
                        "slug":"design_2",
                        "id" : 2
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 3
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 4
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 5
                      }
                    ]
                  }]
                }
      ]
    },
      {
     "order_id": 5,
     "date": "07-03-2016+15:20",
     "repeat_available": false,
     "shipped": "20-01-2016+12:20",
     "order_status": "completed",
     "total": 121.5,
     "count": 9,
     "products": [
        {
              "product_id":1,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":11.50,
              "regular_price":21.12,
              "selected_attributes": {
                "size": "Small",
                "count": 2,
                "design":{
                  "id": 2,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_2"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
            }
            ]},
        {
              "product_id":2,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":12.50,
              "regular_price":22.12,
              "selected_attributes": {
                "size": "Small",
                "count": 1,
                "design":{
                  "id": 1,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_1"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":3,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":13.50,
              "regular_price":23.12,
              "selected_attributes": {
                "size": "Large",
                "count": 2,
                "design":{
                  "id": 3,
                  "img": "img/design_2.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
             }]
              },
        {
              "product_id":4,
              "category":["shampoo","diapers"],
              "name":"Name of the product",
              "img":"img/pufies-pack.png",
              "price":14.50,
              "regular_price":24.12,
              "selected_attributes": {
                "size": "Medium",
                "count": 3,
                "design":{
                  "id": 5,
                  "img": "img/design_1.png",
                  "name":"name of the design",
                  "slug": "design_3"
                }
              },
              "attributes":[
                {
                  "size":"Small",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                  "size":"Medium",
                  "designs":[
                    {
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_1",
                      "id" : 1
                    },{
                      "name":"name of design",
                      "img":"img/design_2.png",
                      "slug":"design_2",
                      "id" : 2
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 3
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 4
                    },{
                      "name":"name of design",
                      "img":"img/design_1.png",
                      "slug":"design_3",
                      "id" : 5
                    }
                  ]
                },
                {
                "size":"Large",

                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              }
              ]
              },
        {
                  "product_id":5,
                  "category":["shampoo","diapers"],
                  "name":"Name of the product",
                  "img":"img/pufies-pack.png",
                  "price":15.50,
                  "regular_price":25.12,
                  "selected_attributes": {
                    "size": "Medium",
                    "count": 1,
                    "design":{
                      "id": 4,
                      "img": "img/design_1.png",
                      "name":"name of the design",
                      "slug": "design_3"
                    }
                  },
                  "attributes":[
                    {
                      "size":"Small",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                      "size":"Medium",
                      "designs":[
                        {
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_1",
                          "id" : 1
                        },{
                          "name":"name of design",
                          "img":"img/design_2.png",
                          "slug":"design_2",
                          "id" : 2
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 3
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 4
                        },{
                          "name":"name of design",
                          "img":"img/design_1.png",
                          "slug":"design_3",
                          "id" : 5
                        }
                      ]
                    },
                    {
                    "size":"Large",

                    "designs":[
                      {
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_1",
                        "id" : 1
                      },{
                        "name":"name of design",
                        "img":"img/design_1.png",
                        "slug":"design_2",
                        "id" : 2
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 3
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 4
                      },{
                        "name":"name of design",
                        "img":"img/design_2.png",
                        "slug":"design_3",
                        "id" : 5
                      }
                    ]
                  }]
                }
      ]
    }
   ]
 };

  var api = 'https://api.myjson.com/bins/16vje';
  var api2 = 'js/orders.js';
  var All = function(){
    return orders;//$http.get(api);
  };

  var One = function(orderId){
    var order = {};
     for(var i=0; i<orders.orders.length; i++){
       if(orders.orders[i].order_id == orderId){
         order = orders.orders[i];
         console.log('Order: ', orders.orders[i]);
       }
     }

     return order;
  };

  return{
    All: All,
    One: One
  }
})

.service('$server',['$http', '$localstorage', function($localstorage, $http) {
  this.connect = function functionName(user_id,token) {
    return true;
  }

  this.orders = function functionName() {
    var api = 'https://api.myjson.com/bins/16vje';
    return $http.get(api);

  }

  this.login = function functionName(email,password) {
    //return true;
      var response = {
        "status":"success|fail",
        "token":"JSD4345JjdSD32s#!@3",
        "user_info":{
          "user_id":12,
          "first_name":"Nick",
          "last_name":"Mouroutis",
          "email":"nikos@mouroutis.com",
          "phone":"+357899123456",
          "addresses":[
            {
              "name":"home",
              "default":true,
              "country":"Greece",
              "state":"Attika",
              "city":"N. Iraklio",
              "zipcode":"14122",
              "street":"Irakliou Ave",
              "number":"313",
              "flour":2,
              "notes":"some notes for the home"
            }
          ]
        },
        "user_products":[
        	{
				"product_id":1,
				"category":["shampoo","diapers"],
				"name":"Name of the product",
				"img":"img/pufies-pack.png",
				"price":11.50,
				"regular_price":21.12,
				"attributes":[
					{
				    "size":"Small",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1",
              "id" : 1
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2",
              "id" : 2
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 3
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 4
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 5
						}
					]
				}
				]
			},
        	{
				"product_id":2,
				"category":["shampoo","diapers"],
				"name":"Name of the product",
				"img":"img/pufies-pack.png",
				"price":12.50,
				"regular_price":22.12,
				"attributes":[
					{
				    "size":"Small",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1",
              "id" : 1
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2",
              "id" : 2
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 3
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 4
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 5
						}
					]
				}
				]
			},
        	{
				"product_id":3,
				"category":["shampoo","diapers"],
				"name":"Name of the product",
				"img":"img/pufies-pack.png",
				"price":13.50,
				"regular_price":23.12,
				"attributes":[
					{
				    "size":"Small",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1",
              "id" : 1
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2",
              "id" : 2
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 3
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 4
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 5
						}
					]
				}
				]
			},
        	{
				"product_id":4,
				"category":["shampoo","diapers"],
				"name":"Name of the product",
				"img":"img/pufies-pack.png",
				"price":14.50,
				"regular_price":24.12,
				"attributes":[
					{
				    "size":"Small",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1",
                "id" : 1
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2",
                "id" : 2
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 3
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 4
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3",
                "id" : 5
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1",
              "id" : 1
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2",
              "id" : 2
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 3
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 4
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3",
              "id" : 5
						}
					]
				}
				]
			},{
            "product_id":5,
            "category":["shampoo","diapers"],
            "name":"Name of the product",
            "img":"img/pufies-pack.png",
            "price":15.50,
            "regular_price":25.12,
            "attributes":[
              {
                "size":"Small",
                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              },
              {
                "size":"Medium",
                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_1",
                    "id" : 1
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_2",
                    "id" : 2
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3",
                    "id" : 3
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3",
                    "id" : 4
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3",
                    "id" : 5
                  }
                ]
              },
              {
              "size":"Large",

              "designs":[
                {
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_1",
                  "id" : 1
                },{
                  "name":"name of design",
                  "img":"img/design_1.png",
                  "slug":"design_2",
                  "id" : 2
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3",
                  "id" : 3
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3",
                  "id" : 4
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3",
                  "id" : 5
                }
              ]
            }
            ]
          }
        ],
        "user_offers":[
          {
            "product_id":1234,
            "category":["shampoo","diapers"],
            "name":"Name of the offer",
            "img":"img/pufies-pack.png",
            "price":10.50,
            "regular_price":20.12,
            "attributes":{
              "size":["L","M","S"],
              "design":[
                {
                  "name":"name of design",
                  "img":"http://url-to-design.png",
                  "slug":"design_1"
                },
                {
                  "name":"name of design",
                  "img":"http://url-to-design.png",
                  "slug":"design_1"
                }
              ]
            }
          }
        ],
        "user_orders":[
          {
            "order_id":12345,
            "date":"dd-MM-YYYY+hh:mm",
            "shipped":"dd-MM-YYYY+hh:mm",
            "total":23.40,
            "status":"order_status",
            "repeat_available":true
          }
        ]
      };

      return response;
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
