(function () {
    'use strict';
    angular
        .module('com.module.gymify')
        .config([
            function () {
            }
        ])
        .run(function ($rootScope, Setting, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Goals'), 'app.goals', 'fa-road');
            $rootScope.addMenu(gettextCatalog.getString('Plan'), 'app.plan', 'fa-check');
            $rootScope.addMenu(gettextCatalog.getString('Browse'), 'app.browse', 'fa-rocket');
            $rootScope.addMenu(gettextCatalog.getString('My channel'), 'app.channel', 'fa-rocket');
            $rootScope.addMenu(gettextCatalog.getString('Subscriptions'), 'app.subscriptions', 'fa-rocket');
            $rootScope.addMenu(gettextCatalog.getString('History'), 'app.history', 'fa-rocket');
        });
})();
