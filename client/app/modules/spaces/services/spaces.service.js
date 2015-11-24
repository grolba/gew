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

            this.getFormFields = function () {
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
                        key: 'type',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Type'),
                            required: true,
                            options: [{
                                name: 'Leerer Bereich: Mit einem leeren Bereich starten.',
                                value: 'empty'
                            }, {
                                name: 'Kunden-Bereich: Kunden besser erreichen bla bla',
                                value: 'customer'
                            }, {
                                name: 'Team-Bereich: Arbeiten Sie gemeinsam und teilen sie Resourcen mit ihrem Team',
                                value: 'team'
                            }, {
                                name: 'Öffentlicher Bereich: ',
                                value: 'public'
                            }]
                        }
                    }
                ];
            };
        });

})();
