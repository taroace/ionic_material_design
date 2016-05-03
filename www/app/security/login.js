(function () {
    'use strict';
    angular.module('app.security.login', [])
        .config(config)
        .controller('LoginCtrl', LoginCtrl)
        .service('LoginSvc', LoginSvc);

    // @ngInject
    function config($stateProvider) {
        $stateProvider.state('login', {
            cache: false,
            url: "/login",
            templateUrl: "app/security/login.tpl.html",
            controller: "LoginCtrl as ctrl"
        });
    }

    // @ngInject
    function LoginCtrl($location, $mdDialog, $mdToast, LoginSvc) {
        this._$location = $location;
        this._$mdDialog = $mdDialog;
        this._$mdToast = $mdToast;
        this._loginSrv = LoginSvc;
        this.userName = '';
        this.password = '';
        this.loginAnimate = "login-animate";
    }

    LoginCtrl.prototype = {
        external: function (provider) {
            var self = this;
            self._$mdToast.show(
                self._$mdToast.simple()
                    .content('access through ' + provider + ' account!')
                    .position('bottom right')
                    .hideDelay(2000)
            );
        },
        next: function (event) {
            if (event.keyCode === 13) {
                angular.element(document.querySelector('#password')).focus();
            }
        },
        login: function () {
            var self = this;
            this._loginSrv.login(this.userName, this.password).then(function (data) {
                self._$location.url('app/main');
            }, function (err) {
                self._$mdDialog.show(
                    self._$mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Access denied')
                        .content(err)
                        .ok('Got it!')
                );
            });
        }
    };

    // @ngInject
    function LoginSvc($q) {
        this._$q = $q;
    }

    LoginSvc.prototype = {
        login: function (userName, password) {
            return this._$q(function (resolve, reject) {
                if (userName === 'user') {
                    resolve('Welcome');
                } else {
                    reject('The credentials are invalid!');
                }
            });
        }
    };
})();