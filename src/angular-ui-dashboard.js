'use strict';

angular.module('ui.dashboard', ['ui.bootstrap', 'ui.sortable']);

angular.module('ui.dashboard')
  .directive('dashboard', function () {
    return {
      restrict: 'A',
      templateUrl: 'template/dashboard.html',
      scope: true,
      controller: function ($scope) {
        $scope.sortableOptions = {
          stop: function () {
            //TODO store active widgets in local storage on add/remove/reorder
            //var titles = _.map($scope.widgets, function (widget) {
            //  return widget.title;
            //});
            //console.log(titles);
          },
          handle: '.widget-header'
        };
      },
      link: function (scope, element, attrs) {
        scope.options = scope.$eval(attrs.dashboard);

        var count = 1;

        scope.addWidget = function (widgetDef) {
          var widget = {
            title: 'Widget ' + count++,
            name: widgetDef.name,
            attrs: widgetDef.attrs,
            style: widgetDef.style
          };

          if (widgetDef.template) {
            widget.template = widgetDef.template;
          } else {
            var directive = widgetDef.directive ? widgetDef.directive : widgetDef.name;
            widget.directive = directive;
          }

          scope.widgets.push(widget);
        };

        scope.removeWidget = function (widget) {
          scope.widgets.splice(_.indexOf(scope.widgets, widget), 1);
        };

        scope.clear = function () {
          scope.widgets = [];
        };

        scope.widgets = [];
        _.each(scope.options.defaultWidgets, function (widgetDef) {
          scope.addWidget(widgetDef);
        });

        scope.addWidgetInternal = function (event, widgetDef) {
          event.preventDefault();
          scope.addWidget(widgetDef);
        };

        // allow adding widgets externally
        scope.options.addWidget = scope.addWidget;
      }
    };
  })
  .directive('widget', ['$compile', function ($compile) {
    function findWidgetPlaceholder(element) {
      // widget placeholder is the first (and only) child of .widget-content
      return angular.element(element.find('.widget-content').children()[0]);
    }

    return {
      link: function (scope, element) {
        var elm = findWidgetPlaceholder(element);
        var widget = scope.widget;

        if (widget.template) {
          elm.replaceWith(widget.template);
          elm = findWidgetPlaceholder(element);
        } else {
          elm.attr(widget.directive, '');

          if (widget.attrs) {
            _.each(widget.attrs, function (value, attr) {
              elm.attr(attr, value);
            });
          }
        }


        $compile(elm)(scope);
      }
    };
  }]);