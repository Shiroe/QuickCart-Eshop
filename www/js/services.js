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

.factory('Cart', [function(){
  var total = 0;
  var count = 0;
  var products = {"products": [
    {"product_id":1234,
    "category":["shampoo","diapers"],
    "name":"Name of the product 1",
    "img":"http://url-to-image.png",
    "price":10.50,
    "regular_price":20.12,
    "attributes":{
      "size":"Small",
      "design":{
          "name":"name of design",
          "img":"http://url-to-design.png",
          "slug":"design_1"
        },
      "count": 1
      }
    },{
    "product_id":1234,
    "category":["shampoo","diapers"],
    "name":"Name of the product 2",
    "img":"http://url-to-image.png",
    "price":10.50,
    "regular_price":20.12,
    "attributes":{
      "size":"Large",
      "design":{
          "name":"name of design",
          "img":"http://url-to-design.png",
          "slug":"design_1"
        },
      "count": 1
      }
    },{
    "product_id":1235,
    "category":["shampoo"],
    "name":"Name of the product 3",
    "img":"http://url-to-image.png",
    "price":11.00,
    "regular_price":20.12,
    "attributes":{
      "size":"Large",
      "design":{
          "name":"name of design",
          "img":"http://url-to-design.png",
          "slug":"design_1"
        },
      "count": 2
      }
    }],
    "total" : 32.00 ,
    "count" : 4
  };

  var getProducts = function(){
    return products;
  }

  var add = function(product){
    products.total += (product.price * product.attributes.count);
    products.count += product.attributes.count;
    products.products.push(product);
  };

  var remove = function(id){

  };

  var removeAll = function(){
    products = { "products": [{}], "total": 0, "count": 0};
  };

  return {
    removeAll: removeAll,
    remove: remove,
    add: add,
    getProducts: getProducts
  }
}])

.service('$server',['$localstorage', function($localstorage) {
  this.connect = function functionName(user_id,token) {
    return true;
  }
  this.login = function functionName(email,password) {
    //return true;
      var response = {
        "status":"success|fail",
        "token":"JSD4345JjdSD32s#!@3",
        "user_info":{
          "user_id":1234,
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
            "product_id":1234,
            "category":["shampoo","diapers"],
            "name":"Name of the product 1",
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
          },
          {
            "product_id":1235,
            "category":["shampoo","diapers"],
            "name":"Name of the product 2",
            "img":"img/pufies-pack.png",
            "price":11.50,
            "regular_price":21.12,
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
          },
          {
            "product_id":1236,
            "category":["shampoo","diapers"],
            "name":"Name of the product 3",
            "img":"img/pufies-pack.png",
            "price":12.50,
            "regular_price":22.12,
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
          },
          {
            "product_id":1237,
            "category":["shampoo","diapers"],
            "name":"Name of the product 4",
            "img":"img/pufies-pack.png",
            "price":13.50,
            "regular_price":23.12,
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
          },
          {
            "product_id":1238,
            "category":["shampoo","diapers"],
            "name":"Name of the product 5",
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
        "user_offers":[
          {
            "product_id":1234,
            "category":["shampoo","diapers"],
            "name":"Name of the offer",
            "img":"http://url-to-image.png",
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
