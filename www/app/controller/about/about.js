(function () {
    'use strict';
    angular.module('app.controller.about', ['ngMap', 'app.service.util'])
        .config(config)
        .controller('AboutCtrl', AboutCtrl);

    // @ngInject
    function config($stateProvider) {
        $stateProvider.state('app.about', {
            url: "/about",
            views: {
                'menuContent': {
                    templateUrl: "app/controller/about/about.tpl.html",
                    controller: "AboutCtrl as ctrl"
                }
            }
        });
    }

    // @ngInject
    function AboutCtrl($scope, $ionicModal, $ionicLoading, Util) {
        this._$ionicLoading = $ionicLoading;
        this._util = Util;

        var self = this;
        $scope.$on('mapInitialized', function (evt, map) {
            self.map = map;
            self.map.destinations = ["mexico, city"];
        });

        $ionicModal.fromTemplateUrl('app/controller/about/map.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            self.mapModal = modal;
        });
    }

    AboutCtrl.prototype = {
        showMap: function () {
            var self = this;
            this.mapModal.show().then(function () {
                self.toUserPosition();
            });
        },
        closeMap: function () {
            this.mapModal.hide();
        },
        toUserPosition: function () {
            this.map.setCenter(this.map.markers[0].getPosition());
            this.map.setZoom(10);
        },
        toMyPosition: function () {
            if (this.map.markers[1]) {
                this.map.setCenter(this.map.markers[1].getPosition());
                this.map.setZoom(17);
                return;
            }

            this._$ionicLoading.show({
                template: 'Getting current location...'
            });

            var self = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                self.map.destinations.push(position.coords.latitude + ", " + position.coords.longitude);
                self.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                self.map.setZoom(17);
                self._$ionicLoading.hide();
            }, function (err) {
                self._$ionicLoading.hide();
            });
        },
        showBoth: function () {
            if (!this.markerBounds) {
                this.markerBounds = new google.maps.LatLngBounds();
                var self = this;
                angular.forEach(this.map.markers, function (mark) {
                    self.markerBounds.extend(mark.getPosition());
                });
            }
            this.map.fitBounds(this.markerBounds);
        }
    };
})();