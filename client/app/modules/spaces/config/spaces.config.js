(function () {
    'use strict';
    angular
        .module('com.module.spaces')
        .config([
            function () {
            }
        ])
        .run(function ($rootScope, Setting, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Spaces'), 'app.spaces.index', 'fa-road');
        });
})();
