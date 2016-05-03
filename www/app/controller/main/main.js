(function () {
    'use strict';
    angular.module('app.controller.main', [])
        .config(config);

    // @ngInject
    function config($stateProvider) {
        $stateProvider.state('app.main', {
            url: "/main",
            views: {
                'menuContent': {
                    templateUrl: "app/controller/main/main.tpl.html"
                }
            }
        });
    }
})();