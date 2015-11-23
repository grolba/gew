(function () {
    'use strict';
    angular
        .module('com.module.gymify')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.goals', {
                    url: '/goals',
                    templateUrl: 'modules/gymify/views/goals.html'
                })
                .state('app.browse', {
                    url: '/browse',
                    templateUrl: 'modules/gymify/views/browse.html',
                    controller: [
                        '$scope',
                        function ($scope) {
                            $scope.gurus = [{
                                name: 'Karl Ess',
                                slogan: 'Mein Slogan',
                                description: 'Mehr als 100 Artikel zu den Themen Training und Ernährung von dem Fitness-Magazin Karl-Ess.com. Kostenlose Traininigspläne, Videos und Interviews.',
                                callToAction: 'Mehr...'
                            }];
                        }
                    ]
                })
                .state('app.profile', {
                    url: '/profile/:id',
                    templateUrl: 'modules/gymify/views/profile.html',
                    controller: [
                        '$scope',
                        function ($scope) {
                            $scope.guru = {
                                name: 'Karl Ess',
                                slogan: 'Mein Slogan',
                                description: 'Mehr als 100 Artikel zu den Themen Training und Ernährung von dem Fitness-Magazin Karl-Ess.com. Kostenlose Traininigspläne, Videos und Interviews.',
                                callToAction: 'Mehr...'
                            };
                        }
                    ]
                })
                .state('app.plan', {
                    url: '/plan',
                    templateUrl: 'modules/gymify/views/plan.html',
                    controller: [
                        '$scope',
                        function ($scope) {
                            var date = new Date();
                            var d = date.getDate();
                            var m = date.getMonth();
                            var y = date.getFullYear();

                            $scope.eventSources = [
                                {
                                    title: 'All Day Event',
                                    start: new Date(y, m, 1)
                                },
                                {
                                    title: 'Long Event',
                                    start: new Date(y, m, d - 5),
                                    end: new Date(y, m, d - 2)
                                },
                                {
                                    id: 999,
                                    title: 'Repeating Event',
                                    start: new Date(y, m, d - 3, 16, 0),
                                    allDay: false
                                },
                                {
                                    id: 999,
                                    title: 'Repeating Event',
                                    start: new Date(y, m, d + 4, 16, 0),
                                    allDay: false
                                },
                                {
                                    title: 'Birthday Party',
                                    start: new Date(y, m, d + 1, 19, 0),
                                    end: new Date(y, m, d + 1, 22, 30),
                                    allDay: false
                                },
                                {
                                    title: 'Click for Google',
                                    start: new Date(y, m, 28),
                                    end: new Date(y, m, 29),
                                    url: 'http://google.com/'
                                }
                            ];
                        }
                    ]
                });
        });

})();
