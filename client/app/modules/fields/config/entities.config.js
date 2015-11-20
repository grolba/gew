(function () {
    'use strict';
    angular
        .module('com.module.entities')
        .run(function ($rootScope, Field, Entity, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Fields'), 'app.fields.list', 'fa-file');

            Field.find(function (data) {
                $rootScope.addDashboardBox(gettextCatalog.getString('Fields'), 'bg-yellow', 'ion-ios7-cart-outline', data.length, 'app.fields.list');
            });

            Entity.find(function (data) {
                $rootScope.addDashboardBox(gettextCatalog.getString('Entities'), 'bg-aqua', 'ion-ios7-pricetag-outline', data.length, 'app.fields.list');
            });

        });

})();
