'use strict';

angular.module('app')
  .controller('LayoutsDemoCtrl', function($scope, widgetDefinitions, defaultWidgets, LayoutStorage, $interval) {
    $scope.layoutOptions = {
      storageId: 'demo-layouts',
      storage: localStorage,
      storageHash: 'fs4df4d51',
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      lockDefaultLayouts: true,
      defaultLayouts: [
        { title: 'Layout 1', active: true , defaultWidgets: defaultWidgets },
        { title: 'Layout 2', active: false, defaultWidgets: defaultWidgets },
        { title: 'Layout 3', active: false, defaultWidgets: defaultWidgets, locked: false }
      ]
    };
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

    $scope.prependWidget = function() {
      $scope.layoutOptions.prependWidget({name: 'random', title: 'Prepend Widget'});
    };
  })
  .controller('LayoutsDemoExplicitSaveCtrl', function($scope, widgetDefinitions, defaultWidgets, LayoutStorage, $interval) {
    $scope.layoutOptions = {
      storageId: 'demo-layouts-explicit-save',
      storage: localStorage,
      storageHash: 'fs4df4d51',
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      explicitSave: true,
      defaultLayouts: [
        { title: 'Layout 1', active: true , defaultWidgets: defaultWidgets },
        { title: 'Layout 2', active: false, defaultWidgets: defaultWidgets },
        { title: 'Layout 3', active: false, defaultWidgets: defaultWidgets }
      ]
    };
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

    $scope.prependWidget = function() {
      $scope.layoutOptions.prependWidget({name: 'random', title: 'Prepend Widget'});
    };
  });