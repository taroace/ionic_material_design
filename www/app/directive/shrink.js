(function () {
    'use strict';
    angular.module('app.directive.shrink', [])
        .directive('shrink', shrink);

    // @ngInject
    function shrink($document) {
        var shrink = function (header, content, amt, max, min) {
            var delta = max - min;
            amt = Math.min(delta, amt);
            ionic.requestAnimationFrame(function () {
                header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
            });
        };

        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                var shrinkAmt;

                var header = $document[0].body.querySelector('#' + $attr.shrink);
                if (!header) {
                    return;
                }
                var headerHeight = header.offsetHeight;
                var ngHeader = angular.element(header);
                var ngDiv = angular.element($element.children("div")[0]);
                var minHeight = ngHeader.css("min-height") ? ngHeader.css("min-height").replace("px", "") : 0;
                $element.css('top', headerHeight + 'px');
                ngDiv.css('padding-top', '0px');
                $element.bind('scroll', function (e) {
                    var scrollTop = null;
                    if (e.detail) {
                        scrollTop = e.detail.scrollTop;
                    } else if (e.target) {
                        scrollTop = e.target.scrollTop;
                    }
                    if (scrollTop > 0) {
                        $element.css('top', (headerHeight - scrollTop) + 'px');
                        ngDiv.css('padding-top', scrollTop + 'px');
                        shrinkAmt = headerHeight - Math.max(0, (headerHeight) - scrollTop);
                        shrink(header, $element[0], shrinkAmt, headerHeight, minHeight);
                    }
                });
            }
        }
    }
})();