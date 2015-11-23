(function () {
    'use strict';
    angular.module('com.module.issues')
        .run(function ($rootScope, Issue, gettextCatalog) {
            //$rootScope.addMenu(gettextCatalog.getString('Issues'), 'app.issues.list', 'fa-tasks');

            Issue.find(function (data) {
                //$rootScope.addDashboardBox(gettextCatalog.getString('Issues'), 'bg-teal', 'ion-document-text', data.length, 'app.issues.list');
            });

        });

})();
