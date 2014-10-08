'use strict';

angular.module('app')
  .controller('ResizeDemoCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets) {
    defaultWidgets = [
      { name: 'fluid', resizeTimeout: 0  },
      { name: 'resizable', resizeTimeout: 0  },
      { name: 'random', style: { width: '50%' }, resizeTimeout: 0  },
      { name: 'time', style: { width: '50%' }, resizeTimeout: 0  },
      { name: 'resizable', title: 'resizable (width: 50%, minWidth: 40%)', size: { width: '50%', minWidth: '40%' }, resizeTimeout: 0 },
      { name: 'resizable', title: 'resizable (width: 50%, minWidth: 900px)', size: { width: '50%', minWidth: '900px' }, resizeTimeout: 0  },
      { name: 'resizable', title: 'resizable (width: 500px, minWidth: 70%)', size: { width: '500px', minWidth: '70%' }, resizeTimeout: 0  },
      { name: 'resizable', title: 'resizable (width: 500px, minWidth: 400px, minHeight: 100px)', size: { width: '200px', height: '50px', minWidth: '400px', minHeight: '100px' }, resizeTimeout: 0  },
      { name: 'resizable', title: 'resizable (height = 25% of width)', size: { width: '50%', height: '50px', minWidth: '400px', minHeight: '100px', heightToWidthRatio: .25 }, resizeTimeout: 0 }
    ];

    $scope.dashboardOptions = {
      widgetButtons: true,
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      storage: $window.localStorage,
      storageId: 'demo_resize'
    };
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

    $scope.prependWidget = function() {
      $scope.dashboardOptions.prependWidget({ name: 'random', title: 'Prepend Widget'});
    };
  })
  .controller('ResizableCtrl', function ($scope) {
    $scope.$on('widgetResized', function (event, size) {
      $scope.width = size.width || $scope.width;
      $scope.height = size.height || $scope.height;
    });
  });