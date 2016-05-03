(function () {
    "use strict";
    angular.module('app.directive.focus', [])
        .directive('focus', focus);

    // @ngInject
    function focus() {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element[0].focus();
            }
        };
    }
})();