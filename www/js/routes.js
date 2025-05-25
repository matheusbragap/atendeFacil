angular.module('atendeFacil').config(function ($routeProvider) {
    $routeProvider
        .when('/categories', {
            templateUrl: 'pages/categories.html',
            controller: 'categoriesController'
        })
        .when('/phrases/:categoryId', {
            templateUrl: 'pages/phrases.html',
            controller: 'phrasesController'
        })
        .when('/settings/general', {
            templateUrl: 'pages/settings/settingSidebar.html',
            controller: 'settingsController'
        })
        .when('/settings/theme', {
            templateUrl: 'pages/settings/settingSidebar.html',
            controller: 'settingsController'
        })
        .when('/settings/about', {
            templateUrl: 'pages/settings/settingSidebar.html',
            controller: 'settingsController'
        })
        .otherwise({ redirectTo: '/categories' })
})

