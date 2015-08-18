'use strict';

/**
 * @ngdoc overview
 * @name firebase101App
 * @description
 * # firebase101App
 *
 * Main module of the application.
 */
angular
  .module('firebase101App', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'markdown',
    'welcome',
    'header',
    'markdownlist'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/info', {
        templateUrl: 'scripts/info/info.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $rootScope.title = current.$$route.title || 'Firebase 101';
    });
  });
