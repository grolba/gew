(function () {
    'use strict';
    angular
        .module('com.module.entities')
        .service('EntitiesService', function (CoreService, Entity, gettextCatalog) {

            this.getEntities = function () {
                return Entity.find({
                    filter: {
                        order: 'created DESC',
                        include: [
                            'fields'
                        ]
                    }
                }).$promise;
            };

            this.getEntity = function (id) {
                return Entity.findOne({
                    where: {
                        id: id
                    }
                }).$promise;
            };

            this.upsertEntity = function (entity) {
                return Entity.upsert(entity).$promise
                    .then(function () {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Entity saved'),
                            gettextCatalog.getString('Your entity is safe with us!')
                        );
                    })
                    .catch(function (err) {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Error saving entity '),
                                gettextCatalog.getString('This entity could no be saved: ') + err
                            );
                        }
                    );
            };

            this.deleteEntity = function (id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function () {
                        Entity.deleteById({id: id}, function () {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Entity deleted'),
                                gettextCatalog.getString('Your entity is deleted!'));
                            successCb();
                        }, function (err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting entity'),
                                gettextCatalog.getString('Your entity is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function () {
                        cancelCb();
                    }
                );
            };

            this.getFormFields = function () {
                return [
                    {
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            label: gettextCatalog.getString('Name'),
                            required: true
                        }
                    }
                ];
            };

        });

})();
