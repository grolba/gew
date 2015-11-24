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
                })
                .state('app.spaces.addspace', {
                    url: '/addspace',
                    templateUrl: 'modules/spaces/views/spaceform.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, SpacesService, space) {
                        this.space = space;
                        this.formFields = SpacesService.getFormFields();
                        this.formOptions = {};
                        this.submit = function () {
                            SpacesService.upsertSpace(this.space).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        space: function () {
                            return {};
                        }
                    }
                });
        });

})();
