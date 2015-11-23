(function () {
    'use strict';
    angular
        .module('com.module.issues')
        .service('IssueService', function ($state, CoreService, Issue, gettextCatalog) {

            this.find = function () {
                return Issue.find().$promise;
            };

            this.findById = function (id) {
                return Issue.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function (issue) {
                return Issue.upsert(issue).$promise
                    .then(function () {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Issue saved'),
                            gettextCatalog.getString('Your issue is safe with us!')
                        );
                    })
                    .catch(function (err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error saving issue '),
                                gettextCatalog.getString('This issue could no be saved: ' + err)
                            );
                        }
                    );
            };

            this.delete = function (id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function () {
                        Issue.deleteById({id: id}, function () {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Issue deleted'),
                                gettextCatalog.getString('Your issue is deleted!'));
                            successCb();
                        }, function (err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting issue'),
                                gettextCatalog.getString('Your issue is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function () {
                        cancelCb();
                    }
                );
            };


            this.getFormFields = function () {
                var form = [
                    {
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            label: gettextCatalog.getString('Name'),
                            required: true
                        }
                    },
                    {
                        key: 'project',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Project'),
                            required: true,
                            'options': [
                                {
                                    'name': 'Iron Man',
                                    'value': 'iron_man'
                                }
                            ]
                        }
                    },
                    {
                        key: 'type',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Type'),
                            required: true,
                            'options': [
                                {
                                    'name': 'Iron Man',
                                    'value': 'iron_man'
                                }
                            ]
                        }
                    },
                    {
                        key: 'summary',
                        type: 'textarea',
                        templateOptions: {
                            label: gettextCatalog.getString('Summary'),
                            rows: 10
                        }
                    },
                    {
                        key: 'priority',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Priority'),
                            required: true,
                            options: [
                                {
                                    'name': gettextCatalog.getString('Blocker'),
                                    'value': 100
                                },
                                {
                                    'name': gettextCatalog.getString('Critical'),
                                    'value': 80
                                },
                                {
                                    'name': gettextCatalog.getString('High'),
                                    'value': 60
                                },
                                {
                                    'name': gettextCatalog.getString('Medium'),
                                    'value': 40
                                },
                                {
                                    'name': gettextCatalog.getString('Low'),
                                    'value': 20
                                }
                            ],

                        }
                    },
                    {
                        key: 'asignee',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Asignee'),
                            required: true,
                            'options': [
                                {
                                    'name': 'Tobias Oberrauch',
                                    'value': 1
                                }
                            ]
                        }
                    },
                    {
                        key: 'author',
                        type: 'select',
                        templateOptions: {
                            label: gettextCatalog.getString('Author'),
                            required: true,
                            'options': [
                                {
                                    'name': 'Tobias Oberrauch',
                                    'value': 1
                                }
                            ]
                        }
                    },
                    {
                        'key': 'dueDate',
                        'type': 'datepicker',
                        'templateOptions': {
                            'label': gettextCatalog.getString('Due date'),
                            'type': 'text',
                            'datepickerPopup': 'dd-MMMM-yyyy'
                        }
                    }
                ];
                return form;
            };

        });

})();
