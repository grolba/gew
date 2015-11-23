(function () {
    'use strict';
    /**
     * @ngdoc overview
     * @name loopbackApp
     * @description
     * # loopbackApp
     *
     * Main module of the application.
     */
    angular
        .module('loopbackApp', [
            'angular-loading-bar',
            'angular.filter',
            'angularBootstrapNavTree',
            'angularFileUpload',
            'btford.markdown',
            'oitozero.ngSweetAlert',
            'config',

            'formly',
            'formlyBootstrap',

            'lbServices',
            'monospaced.elastic',

            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',

            'ui.bootstrap',
            'ui.codemirror',
            'ui.gravatar',
            'ui.grid',
            'ui.router',
            'ui.select',
            'ui.calendar',

            'toasty',
            'autofields',
            'gettext',
            'angular-underscore/filters',
            'schemaForm',

            'com.module.core',
            //'com.module.about',
            //'com.module.browser',
            //'com.module.events',
            //'com.module.files',
            //'com.module.notes',
            //'com.module.pages',
            //'com.module.posts',
            //'com.module.products',
            //'com.module.sandbox',
            'com.module.spaces',
            'com.module.entities',
            'com.module.issues',
            'com.module.users',
            'com.module.settings',
            'com.module.gymify'
        ])
        .run(function ($rootScope, $cookies, gettextCatalog) {
            $rootScope.locales = {
                'de': {
                    lang: 'de',
                    country: 'DE',
                    name: gettextCatalog.getString('German')
                },
                'en': {
                    lang: 'en',
                    country: 'US',
                    name: gettextCatalog.getString('English')
                },
                'es_MX': {
                    lang: 'es_MX',
                    country: 'MX',
                    name: gettextCatalog.getString('Spanish')
                },
                'fr': {
                    lang: 'fr',
                    country: 'FR',
                    name: gettextCatalog.getString('Français')
                },
                'nl': {
                    lang: 'nl',
                    country: 'NL',
                    name: gettextCatalog.getString('Dutch')
                },
                'pt-BR': {
                    lang: 'pt_BR',
                    country: 'BR',
                    name: gettextCatalog.getString('Portuguese Brazil')
                },
                'ru_RU': {
                    lang: 'ru_RU',
                    country: 'RU',
                    name: gettextCatalog.getString('Russian')
                }
            };

            var lang = $cookies.lang || navigator.language || navigator.userLanguage;

            $rootScope.locale = $rootScope.locales[lang];

            if ($rootScope.locale === undefined) {
                $rootScope.locale = $rootScope.locales[lang];
                if ($rootScope.locale === undefined) {
                    $rootScope.locale = $rootScope.locales['en'];
                }
            }

            gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

        })
        .run(function (formlyConfig) {
            /*
             ngModelAttrs stuff
             */
            var ngModelAttrs = {};

            function camelize(string) {
                string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                    return chr ? chr.toUpperCase() : '';
                });
                // Ensure 1st char is always lowercase
                return string.replace(/^([A-Z])/, function (match, chr) {
                    return chr ? chr.toLowerCase() : '';
                });
            }

            /*
             timepicker
             */
            ngModelAttrs = {};

            // attributes
            angular.forEach([
                'meridians',
                'readonly-input',
                'mousewheel',
                'arrowkeys'
            ], function (attr) {
                ngModelAttrs[camelize(attr)] = {attribute: attr};
            });

            // bindings
            angular.forEach([
                'hour-step',
                'minute-step',
                'show-meridian'
            ], function (binding) {
                ngModelAttrs[camelize(binding)] = {bound: binding};
            });

            formlyConfig.setType({
                name: 'timepicker',
                template: '<timepicker ng-model="model[options.key]"></timepicker>',
                wrapper: [
                    'bootstrapLabel',
                    'bootstrapHasError'
                ],
                defaultOptions: {
                    ngModelAttrs: ngModelAttrs,
                    templateOptions: {
                        timepickerOptions: {}
                    }
                }
            });

            formlyConfig.setType({
                name: 'datepicker',
                template: '<datepicker ng-model="model[options.key]" ></datepicker>',
                wrapper: [
                    'bootstrapLabel',
                    'bootstrapHasError'
                ],
                defaultOptions: {
                    ngModelAttrs: ngModelAttrs,
                    templateOptions: {
                        datepickerOptions: {}
                    }
                }
            });

            formlyConfig.setType({
                name: 'multiInput',
                templateUrl: '/modules/core/views/form/types/multiInput.html',
                defaultOptions: {
                    noFormControl: true,
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    templateOptions: {
                        inputOptions: {
                            wrapper: null
                        }
                    }
                },
                controller: /* @ngInject */ function ($scope) {
                    $scope.copyItemOptions = copyItemOptions;

                    function copyItemOptions() {
                        return angular.copy($scope.to.inputOptions);
                    }
                }
            });

            var unique = 1;

            formlyConfig.setType({
                name: 'repeatingSection',
                templateUrl: '/modules/core/views/form/types/repeatingSection.html',
                controller: function ($scope) {
                    $scope.formOptions = {
                        formState: $scope.formState
                    };
                    $scope.addNew = function addNew() {
                        $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
                        var repeatSection = $scope.model[$scope.options.key];
                        var lastSection = repeatSection[repeatSection.length - 1];
                        var newSection = {};
                        if (lastSection) {
                            newSection = angular.copy(lastSection);
                        }
                        repeatSection.push(newSection);
                    };
                    $scope.copyFields = function copyFields(fields) {
                        fields = angular.copy(fields);
                        addRandomIds(fields);
                        return fields;
                    };

                    function addRandomIds(fields) {
                        unique++;
                        angular.forEach(fields, function (field, index) {
                            if (field.fieldGroup) {
                                addRandomIds(field.fieldGroup);
                                return; // fieldGroups don't need an ID
                            }

                            if (field.templateOptions && field.templateOptions.fields) {
                                addRandomIds(field.templateOptions.fields);
                            }

                            field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
                        });
                    }

                    function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min)) + min;
                    }
                }
            });

            formlyConfig.setType({
                name: 'customInput',
                extends: 'input',
                controller: ['$scope', function ($scope) {
                    $scope.options.data.getValidationMessage = getValidationMessage;

                    function getValidationMessage(key) {
                        var message = $scope.options.validation.messages[key];
                        if (message) {
                            return message($scope.fc.$viewValue, $scope.fc.$modelValue, $scope);
                        }
                    }
                }]
            });
            formlyConfig.setType({
                name: 'maskedInput',
                extends: 'customInput',
                defaultOptions: {
                    ngModelAttrs: { // this is part of the magic... It's a little complex, but super powerful
                        mask: { // the key "ngMask" must match templateOptions.ngMask
                            attribute: 'mask' // this the name of the attribute to be applied to the ng-model in the template
                        },
                        // applies the 'clean' attribute with the value of "true"
                        'true': {value: 'clean'}
                    },
                    // this is how you hook into formly's messages API
                    // however angular-formly doesn't ship with ng-messages.
                    // You have to display these messages yourself.
                    validation: {
                        messages: {
                            mask: '"Invalid input"'
                        }
                    }
                }
            });
            //formlyConfig.setWrapper({
            //    name: 'validation',
            //    types: ['input', 'customInput', 'maskedInput'],
            //    templateUrl: '/modules/core/views/form/types/messages.html'
            //});

        });

})();
