(function () {
    'use strict';
    angular.module('app.directive.inputclear', [])
        .directive('inputClear', inputClear);

    // @ngInject
    function inputClear() {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var color = attrs.inputClear;
                var style = color ? "color:" + color + ";" : "";
                var action = attrs.ngModel + " = ''";

                element.after(
                    '<md-button type="button" class="animate-if md-icon-button md-accent"' +
                    'ng-if="' + attrs.ngModel + '" ng-click="' + action + '"' +
                    'style="position: absolute; top: 0px; right: -6px; margin: 23px 0px;">' +
                    '<md-icon style="' + style + '">close</md-icon>' +
                    '</md-button>');
            }
        };
    }
})();