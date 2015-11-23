(function () {
    'use strict';

    angular
        .module('com.module.issues')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.issues', {
                    abstract: true,
                    url: '/issues',
                    templateUrl: 'modules/issues/views/main.html'
                })
                .state('app.issues.list', {
                    url: '',
                    templateUrl: 'modules/issues/views/list.html',
                    controllerAs: 'ctrl',
                    controller: function (issues) {
                        this.issues = issues;
                    },
                    resolve: {
                        issues: function (IssueService) {
                            return IssueService.find();
                        }
                    }
                })
                .state('app.issues.add', {
                    url: '/add',
                    templateUrl: 'modules/issues/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, IssueService, issue) {
                        this.editorOptions = {
                            theme: 'monokai',
                            lineWrapping: true,
                            lineNumbers: true,
                            mode: 'markdown'
                        };
                        this.issue = issue;
                        this.formFields = IssueService.getFormFields();
                        this.formOptions = {};
                        this.submit = function () {
                            IssueService.upsert(this.issue).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        issue: function () {
                            return {
                                content: '# Hi!\n\n## This is a markdown editor.\n\n    fine code goes here \n\n- lists \n- go \n- here ' +
                                '\n\n*Find* **more information** about `markdown` [Here](https://daringfireball.net/projects/markdown/basics)!'
                            };
                        }
                    }
                })
                .state('app.issues.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/issues/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function ($state, IssueService, issue) {
                        this.editorOptions = {
                            theme: 'monokai',
                            lineWrapping: true,
                            lineNumbers: true,
                            mode: 'markdown'
                        };
                        this.issue = issue;
                        this.formFields = IssueService.getFormFields();
                        this.formOptions = {};
                        this.submit = function () {
                            IssueService.upsert(this.issue).then(function () {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        issue: function ($stateParams, IssueService) {
                            return IssueService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.issues.view', {
                    url: '/:id',
                    templateUrl: 'modules/issues/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function (issue) {
                        this.issue = issue;
                    },
                    resolve: {
                        issue: function ($stateParams, IssueService) {
                            return IssueService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.issues.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function ($stateParams, $state, IssueService) {
                        IssueService.delete($stateParams.id, function () {
                            $state.go('^.list');
                        }, function () {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();
