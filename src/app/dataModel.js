'use strict';

angular.module('app')
  .factory('RandomDataModel', function ($interval, WidgetDataModel) {
    function RandomDataModel() {
    }

    RandomDataModel.prototype = Object.create(WidgetDataModel.prototype);
    RandomDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(RandomDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.limit = (dataModelOptions && dataModelOptions.limit) ? dataModelOptions.limit : 100;

        this.updateScope('-');
        this.startInterval();
      },

      startInterval: function () {
        $interval.cancel(this.intervalPromise);

        this.intervalPromise = $interval(function () {
          var value = Math.floor(Math.random() * this.limit);
          this.updateScope(value);
        }.bind(this), 500);
      },

      updateLimit: function (limit) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.limit = limit;
        this.limit = limit;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
        $interval.cancel(this.intervalPromise);
      }
    });

    return RandomDataModel;
  });