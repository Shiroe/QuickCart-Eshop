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
  var cart_data = { "products": [], "total": 0, "count": 0};

  var getProducts = function(){
    return cart_data;
  };

  var updateCount = function(product){
    var lcount = 0;
    var ltotal = 0;
    angular.forEach(cart_data.products, function(value, key){
			if(value === product){
        cart_data.products[key].attributes.count = product.attributes.count;
        calculate();
			}else{

      }
		})
    //console.log(cart_data);
  };

  var add = function(product){
    cart_data.total += (product.price * product.attributes.count);
    cart_data.count += product.attributes.count;
    cart_data.products.push(product);
    //console.log(product);
  };

  var remove = function(product){
     cart_data.total -= (product.price * product.attributes.count);
     cart_data.count -= product.attributes.count;
     cart_data.products.splice(product, 1);
     calculate();
  };

  var removeAll = function(){
    cart_data = { "products": [{}], "total": 0, "count": 0};
  };
  var calculate = function(){
    var cc = 0;
    var tt = 0;
    for(var i=0; i<cart_data.products.length; i++){
      tt += (cart_data.products[i].attributes.count * cart_data.products[i].price);
      cc += cart_data.products[i].attributes.count;
    }
    cart_data.total = tt;
    cart_data.count = cc;
    //console.log("total count : " + cc + " " + "total price : " + tt);
  }

  return {
    removeAll: removeAll,
    remove: remove,
    add: add,
    getProducts: getProducts,
    updateCount: updateCount
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
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1"
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
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
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1"
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
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
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1"
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
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
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
				    "size":"Medium",
				    "designs":[
							{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_1"
				      },{
				        "name":"name of design",
				        "img":"img/design_2.png",
				        "slug":"design_2"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      },{
				        "name":"name of design",
				        "img":"img/design_1.png",
				        "slug":"design_3"
				      }
						]
				  },
					{
					"size":"Large",

					"designs":[
						{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_1"
						},{
							"name":"name of design",
							"img":"img/design_1.png",
							"slug":"design_2"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
						},{
							"name":"name of design",
							"img":"img/design_2.png",
							"slug":"design_3"
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
                    "slug":"design_1"
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_2"
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3"
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_3"
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3"
                  }
                ]
              },
              {
                "size":"Medium",
                "designs":[
                  {
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_1"
                  },{
                    "name":"name of design",
                    "img":"img/design_2.png",
                    "slug":"design_2"
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3"
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3"
                  },{
                    "name":"name of design",
                    "img":"img/design_1.png",
                    "slug":"design_3"
                  }
                ]
              },
              {
              "size":"Large",

              "designs":[
                {
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_1"
                },{
                  "name":"name of design",
                  "img":"img/design_1.png",
                  "slug":"design_2"
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3"
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3"
                },{
                  "name":"name of design",
                  "img":"img/design_2.png",
                  "slug":"design_3"
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
