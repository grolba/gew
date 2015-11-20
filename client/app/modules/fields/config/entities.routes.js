(function () {
    'use strict';
    angular
        .module('com.module.entities')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.fields', {
                    abstract: true,
                    url: '/fields',
                    templateUrl: 'modules/fields/views/main.html'
                })
                .state('app.fields.list', {
                    url: '',
                    templateUrl: 'modules/fields/views/list.html',
                    controllerAs: 'ctrl',
                    controller: function (entities) {
                        this.entities = entities;
                    },
                    resolve: {
                        entities: [
                            'EntitiesService',
                            function (EntitiesService) {
                                return EntitiesService.getEntities();
                            }
                        ]
                    }
                })
                .state('app.fields.add', {
                    url: '/add/:entityId',
                    templateUrl: 'modules/fields/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, FieldsService, entities, field) {
                        this.entities = entities;
                        this.field = field;
                        this.formFields = FieldsService.getFormFields(entities);
                        this.formOptions = {};
                        this.submit = function () {
                            FieldsService.upsertField(this.field).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        entities: function (EntitiesService) {
                            return EntitiesService.getEntities();
                        },
                        field: function ($stateParams) {
                            return {
                                entityId: $stateParams.entityId
                            };
                        }
                    }
                })
                .state('app.fields.edit', {
                    url: '/:fieldId/edit',
                    templateUrl: 'modules/fields/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, FieldsService, entities, field) {
                        this.entities = entities;
                        this.field = field;
                        this.formFields = FieldsService.getFormFields(entities);
                        this.formOptions = {};
                        this.submit = function () {
                            FieldsService.upsertField(this.field).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        entities: function (EntitiesService) {
                            return EntitiesService.getEntities();
                        },
                        field: function ($stateParams, FieldsService) {
                            return FieldsService.getField($stateParams.fieldId);
                        }
                    }
                })
                .state('app.fields.addentity', {
                    url: '/addentity',
                    templateUrl: 'modules/fields/views/entityform.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, EntitiesService, entity) {
                        this.entity = entity;
                        this.formFields = EntitiesService.getFormFields();
                        this.formOptions = {};
                        this.submit = function () {
                            EntitiesService.upsertEntity(this.entity).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        entity: function () {
                            return {};
                        }
                    }
                })
                .state('app.fields.view', {
                    url: '/:fieldId',
                    templateUrl: 'modules/fields/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function (field) {
                        this.field = field;
                        console.log(field);
                    },
                    resolve: {
                        field: function ($stateParams, FieldsService) {
                            return FieldsService.getField($stateParams.fieldId);
                        }
                    }
                })
                .state('app.fields.editentity', {
                    url: '/editentity/:entityId',
                    templateUrl: 'modules/fields/views/entityform.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, EntitiesService, entity) {
                        this.entity = entity;
                        this.formFields = EntitiesService.getFormFields();
                        this.formOptions = {};
                        this.submit = function () {
                            EntitiesService.upsertEntity(this.entity).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        entity: function ($stateParams, EntitiesService) {
                            return EntitiesService.getEntity($stateParams.entityId);
                        }
                    }
                })
                .state('app.fields.deleteentity', {
                    url: '/entity/:entityId/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function ($state, EntitiesService, field) {
                        EntitiesService.deleteEntity(field.id, function () {
                            $state.go('^.list');
                        }, function () {
                            $state.go('^.list');
                        });
                    },
                    resolve: {
                        field: function ($stateParams, EntitiesService) {
                            return EntitiesService.getEntity($stateParams.entityId);
                        }
                    }
                })
                .state('app.fields.delete', {
                    url: '/:fieldId/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function ($state, FieldsService, field) {
                        FieldsService.deleteField(field.id, function () {
                            $state.go('^.list');
                        }, function () {
                            $state.go('^.list');
                        });
                    },
                    resolve: {
                        field: function ($stateParams, FieldsService) {
                            return FieldsService.getField($stateParams.fieldId);
                        }
                    }
                });
        });

})();
