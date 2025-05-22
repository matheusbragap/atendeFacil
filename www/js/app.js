var app = angular.module('atendeFacil', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/categories.html',
                controller: 'categoriesController'
            })
            .when('/phrases/:categoryId', {
                templateUrl: 'pages/phrases.html',
                controller: 'phrasesController'
            })
            .otherwise({ redirectTo: '/' })
    })