(function () {
    'use strict';
    angular.module('app', [
        'ionic',
        'ngMaterial',
        'templates',
        'app.security.login',
        'app.directive.focus',
        'app.directive.inputclear',
        'app.directive.shrink',
        'app.controller'
    ])
        .run(run)
        .config(config)
        .controller('MainCtrl', MainCtrl);

    // @ngInject
    function run($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }

    // @ngInject
    function config($mdGestureProvider, $stateProvider, $urlRouterProvider) {
        //prevent to fire angular calls twice when Ionic and ngMaterial are being used
        $mdGestureProvider.skipClickHijack();

        //provide the abstract url to menu
        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/layout/menu.tpl.html",
            controller: 'MainCtrl as ctrl'
        });

        //provide the default route
        $urlRouterProvider.otherwise('/login');
    }

    // @ngInject
    function MainCtrl($location, $mdDialog, $mdToast) {
        this.logout = function () {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('confirm log out')
                .content('Would you really want to exit?')
                .ok('Yeah, Im sure!')
                .cancel('No, I prefer to stay');

            $mdDialog.show(confirm).then(function () {
                $location.url('login');
            }, function () {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Process canceled!')
                        .position('top right')
                        .hideDelay(2000)
                );
            });
        };
    }
})();