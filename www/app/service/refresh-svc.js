(function () {
    'use strict';
    angular.module('app.service.refresh-svc', [])
        .service('RefreshSvc', RefreshSvc);

    // @ngInject
    function RefreshSvc($timeout, $ionicScrollDelegate) {
        this._$timeout = $timeout;
        this._$ionicScrollDelegate = $ionicScrollDelegate;
    }

    RefreshSvc.prototype = {
        /**
         * Trigger the pull-to-refresh on a specific scroll view delegate handle.
         * @param {string} delegateHandle - The `delegate-handle` assigned to the `ion-content` in the view.
         */
        triggerRefresh: function (delegateHandle) {
            var self = this;
            this._$timeout(function () {
                var scrollView = self._$ionicScrollDelegate.$getByHandle(delegateHandle).getScrollView();
                if (!scrollView) return;

                scrollView.__publish(scrollView.__scrollLeft, -scrollView.__refreshHeight, scrollView.__zoomLevel, true);
                var d = new Date();
                scrollView.refreshStartTime = d.getTime();
                scrollView.__refreshActive = true;
                scrollView.__refreshHidden = false;
                if (scrollView.__refreshShow) {
                    scrollView.__refreshShow();
                }
                if (scrollView.__refreshActivate) {
                    scrollView.__refreshActivate();
                }
                if (scrollView.__refreshStart) {
                    scrollView.__refreshStart();
                }
            });
        }
    };
})();