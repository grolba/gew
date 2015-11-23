(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name com.module.gymify.directive:teaserBox
     * @description
     * # home
     */
    angular
        .module('com.module.gymify')
        .directive('teaserBox', function () {
            return {
                templateUrl: '/modules/gymify/views/teaser-box.html',
                restrict: 'A',
                link: function (scope, element) {
                }
            };
        });

})();
