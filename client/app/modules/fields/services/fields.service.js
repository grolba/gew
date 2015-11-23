(function () {
    'use strict';
    angular
        .module('com.module.entities')
        .service('FieldsService', function (CoreService, Field, gettextCatalog) {

            this.getFields = function () {
                return Field.find({
                    filter: {
                        order: 'created DESC'
                    }
                }).$promise;
            };

            this.getField = function (id) {
                return Field.findById({
                    id: id
                }).$promise;
            };

            this.upsertField = function (field) {
                return Field.upsert(field).$promise
                    .then(function () {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Field saved'),
                            gettextCatalog.getString('Your field is safe with us!')
                        );
                    })
                    .catch(function (err) {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Error saving field '),
                                gettextCatalog.getString('This field could no be saved: ') + err
                            );
                        }
                    );
            };

            this.deleteField = function (id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function () {
                        Field.deleteById({id: id}, function () {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Field deleted'),
                                gettextCatalog.getString('Your field is deleted!'));
                            successCb();
                        }, function (err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting field'),
                                gettextCatalog.getString('Your field is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function () {
                        cancelCb();
                    }
                );
            };

            this.getFormFields = function (entities) {
                return [{
                    type: 'repeatingSection',
                    key: 'fields',
                    templateOptions: {
                        btnText: 'Add another field',
                        fields: [
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
                        ]
                    }
                }];
            };
        });

})();
