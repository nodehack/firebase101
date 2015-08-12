(function (angular) {
  'use strict';

  angular.module('welcome', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/welcome/welcome.html',
          controller: 'WelcomeController',
          controllerAs: 'view',
        });
    })
    .controller('WelcomeController', function () {

    });

})(angular);
