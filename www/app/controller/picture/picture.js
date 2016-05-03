(function () {
    'use strict';
    angular.module('app.controller.picture', ['app.service.refresh-svc'])
        .config(config)
        .controller('PictureCtrl', PictureCtrl);

    // @ngInject
    function config($stateProvider) {
        $stateProvider.state('app.picture', {
            url: "/picture",
            views: {
                'menuContent': {
                    templateUrl: "app/controller/picture/picture.tpl.html",
                    controller: "PictureCtrl as ctrl"
                }
            }
        });
    }

    // @ngInject
    function PictureCtrl($scope, $mdDialog, RefreshSvc) {
        this._$scope = $scope;
        this._$mdDialog = $mdDialog;
        this._refreshSvc = RefreshSvc;
        this.pictures = [
            'http://www.independent.co.uk/incoming/article8465213.ece/alternates/w620/v2-cute-cat-picture.jpg',
            'http://www.sharebin.net/gHc.jpg',
            'http://hdwallnpics.com/wp-content/gallery/hd-tiger-images/tigers-wallpapers-hd.jpg',
            'http://3.bp.blogspot.com/-rZmCIp0C-hQ/Tx6aCFeweoI/AAAAAAAAAnQ/WqIEVBTIzRk/s1600/Cool-Tiger-Wallpaper-1920x1080-HD.jpg',
            'http://economictimes.indiatimes.com/thumb/msid-25252601,width-640,resizemode-4/stunning-images-of-the-space.jpg'
        ];
    }

    PictureCtrl.prototype = {
        doRefresh: function () {
            this._$scope.$broadcast('scroll.refreshComplete');
        },
        new: function () {
            //only works on device
            var self = this;
            navigator.camera.getPicture(function (url) {
                self.pictures.push(url);
                self._refreshSvc.triggerRefresh('refresh-content');
            });
        },
        remove: function (index) {
            var confirm = this._$mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('confirm remove')
                .content('Would you like to remove this picture?')
                .ok('Yes')
                .cancel('No');

            var self = this;
            this._$mdDialog.show(confirm).then(function () {
                self.pictures.splice(index, 1);
            });
        }
    };
})();