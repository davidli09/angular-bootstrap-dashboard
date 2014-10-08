'use strict';

angular.module('ui.dashboard')
  .factory('WidgetDefCollection', function () {

    function convertToDefinition(d) {
      if (typeof d === 'function') {
        return new d();
      }
      return d;
    }

    function WidgetDefCollection(widgetDefs) {
      
      widgetDefs = widgetDefs.map(convertToDefinition);

      this.push.apply(this, widgetDefs);

      // build (name -> widget definition) map for widget lookup by name
      var map = {};
      _.each(widgetDefs, function (widgetDef) {
        map[widgetDef.name] = widgetDef;
      });
      this.map = map;
    }

    WidgetDefCollection.prototype = Object.create(Array.prototype);

    WidgetDefCollection.prototype.getByName = function (name) {
      return this.map[name];
    };

    WidgetDefCollection.prototype.add = function(def) {
      def = convertToDefinition(def);
      this.push(def);
      this.map[def.name] = def;
    };

    return WidgetDefCollection;
  });
