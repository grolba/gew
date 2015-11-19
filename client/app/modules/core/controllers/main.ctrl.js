(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.core.controller:MainCtrl
     * @description Login Controller
     * @requires $scope
     * @requires $state

     * @requires CoreService
     * @requires User
     * @requires gettextCatalog
     **/
    angular
        .module('com.module.core')
        .controller('MainCtrl', function ($scope, $rootScope, $state, AppAuth, CoreService, User, gettextCatalog) {
            AppAuth.ensureHasCurrentUser(function () {
                $scope.currentUser = User.getCurrent();
            });
            var enabledModules = [
                'app.home'
            ];

            $scope.menuoptions = $rootScope.menu.filter(function (menuItem) {
                return true;
                return enabledModules.indexOf(menuItem.sref) > -1;
            });

            $scope.logout = function () {
                AppAuth.logout(function () {
                    CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
                        gettextCatalog.getString('You are logged out!'));
                    $state.go('login');
                });
            };

        });

})();
