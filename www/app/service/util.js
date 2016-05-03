(function () {
    'use strict';
    angular.module('app.service.util', [])
        .service('Util', Util);

    // @ngInject
    function Util($window) {
        this._$window = $window;
    }

    Util.prototype = {
        open: function (url, target, ops) {
            if (!target) {
                target = '_system';
            }
            this._$window.open(url, target, ops)
        }
    };
})();