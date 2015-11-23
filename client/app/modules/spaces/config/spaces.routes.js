(function () {
    'use strict';
    angular
        .module('com.module.spaces')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.spaces', {
                    abstract: true,
                    url: '/spaces',
                    templateUrl: 'modules/spaces/views/layout.html'
                })
                .state('app.spaces.index', {
                    url: '',
                    templateUrl: 'modules/spaces/views/index.html',
                    controller: function (spaces) {
                        this.spaces = spaces;
                    },
                    resolve: {
                        spaces: [
                            'SpacesService',
                            function (SpacesService) {
                                return SpacesService.getSpaces();
                            }
                        ]
                    }
                });
        });

})();
