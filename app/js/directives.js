'use strict';

/* Directives */


angular.module('MDAndersonMobile.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
