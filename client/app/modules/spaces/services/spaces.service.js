(function () {
    'use strict';
    angular
        .module('com.module.spaces')
        .service('SpacesService', function (CoreService, Space, gettextCatalog) {

            this.getSpaces = function () {
                return Space.find({
                    filter: {
                        order: 'created DESC'
                    }
                }).$promise;
            };

            this.getSpace = function (id) {
                return Space.findById({
                    id: id
                }).$promise;
            };

            this.upsertSpace = function (space) {
                return Space.upsert(space).$promise
                    .then(function () {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Space saved'),
                            gettextCatalog.getString('Your space is safe with us!')
                        );
                    })
                    .catch(function (err) {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Error saving space '),
                                gettextCatalog.getString('This space could no be saved: ') + err
                            );
                        }
                    );
            };

            this.deleteSpace = function (id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function () {
                        Space.deleteById({id: id}, function () {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Space deleted'),
                                gettextCatalog.getString('Your space is deleted!'));
                            successCb();
                        }, function (err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting space'),
                                gettextCatalog.getString('Your space is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function () {
                        cancelCb();
                    }
                );
            };

            this.getFormFields = function (entities) {
                return [
                    {
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            label: gettextCatalog.getString('Name'),
                            required: true
                        }
                    },
                    {
                        key: 'entityId',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Entity'),
                            required: true,
                            options: entities.map(function (entity) {
                                return {
                                    name: entity.name,
                                    value: entity.id
                                };
                            })
                        }
                    },
                    {
                        key: 'type',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Type'),
                            required: true,
                            options: [{
                                name: 'Text',
                                value: 'text'
                            }]
                        }
                    }
                ];
            };
        });

})();
