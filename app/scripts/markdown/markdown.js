(function (angular) {
  'use strict';

  angular.module('markdown', ['ngRoute', 'hc.marked', 'myfirebase', 'firebase'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/markdown/:id', {
          title: 'Markdown Editor',
          templateUrl: 'scripts/markdown/markdown.html',
          controller: 'MarkdownController',
          controllerAs: 'view',
          resolve: {
            markdown: function (MyFirebaseService, $route, $firebaseObject) {
              return $firebaseObject(MyFirebaseService.getMarkdown($route.current.params.id));
            }
          }
        })
        .when('/markdown/view/:id', {
          title: 'Markdown',
          templateUrl: 'scripts/markdown/viewmarkdown.html',
          controller: 'MarkdownController',
          controllerAs: 'view',
          resolve: {
            markdown: function (MyFirebaseService, $route, $firebaseObject) {
              return $firebaseObject(MyFirebaseService.getMarkdown($route.current.params.id));
            }
          }
        });
    })
    .controller('MarkdownController', function ($scope, markdown) {
       markdown.$bindTo($scope, 'markdown');
    })
    .directive('elastic', function($timeout) {
      return {
        restrict: 'A',
        link: function($scope, element) {
          $scope.initialHeight = $scope.initialHeight || element[0].style.height;
          var resize = function() {
            element[0].style.height = $scope.initialHeight;
            element[0].style.height = 5 + element[0].scrollHeight + "px";
          };
          element.on("blur keyup change", resize);
          $timeout(resize, 0);
        }
      };
    })
    .directive('allowTab', function () {
      return function (scope, element) {
        element.bind('keydown', function (event) {
          if (event.which === 9) {
            event.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            element.val(element.val().substring(0, start) + '\t' + element.val().substring(end));
            this.selectionStart = this.selectionEnd = start + 1;
            element.triggerHandler('change');
          }
        });
      };
    });

})(angular);
