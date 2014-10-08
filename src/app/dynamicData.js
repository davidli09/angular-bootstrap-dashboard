'use strict';

angular.module('app')
  .controller('DynamicDataCtrl', function ($scope, $window, widgetDefinitions, defaultWidgets, CartDataModel) {

    $scope.cart = new CartDataModel();
    $scope.item = {
      name: '',
      qty: 0,
      price: 0
    };

    var definitions = [{
      name: 'cartDetail',
      title: 'cart detail',
      templateUrl: 'app/template/cartDetail.html',
      size: { width: '800px', minWidth: '600px', },
      cart: $scope.cart
    }, {
      name: 'cartSummary',
      title: 'cart summary',
      templateUrl: 'app/template/cartSummary.html',
      size: { width: '400px', minWidth: '400px', },
      cart: $scope.cart
    }];

    var defaultWidgets = [
      { name: 'cartDetail' },
      { name: 'cartSummary' }
    ];

    $scope.dashboardOptions = {
      hideToolbar: true,
      widgetDefinitions: definitions,
      defaultWidgets: defaultWidgets,
      storage: $window.localStorage,
      storageId: 'demo_dynamic-data'
    };

    $scope.addItem = function() {
      if (!_.isEmpty($scope.item.name) &&
          $scope.item.qty !== undefined && $scope.item.qty > 0 &&
          $scope.item.price !== undefined && $scope.item.price > 0) {
        // only add item to cart if form is valid
        $scope.cart.addItem($scope.item);
        $scope.item = {
          name: '',
          qty: 0,
          price: 0
        };
      }
    };

    $scope.autoFillCart = function() {
      var list = [ 'Apple', 'Banana', 'Coke', 'Milk', 'Pear', 'Water' ];
      for(var i = 0; i < list.length; i++) {
        $scope.cart.addItem({
          name: list[i],
          qty: _.random(1, 10),
          price: _.round(_.random(1, 10, true), 2)
        });
      }
    };
  })
  .controller('CartCtrl', function ($scope) {
    $scope.removeItem = function(item) {
      $scope.cart.removeItem(item);
    };
  });