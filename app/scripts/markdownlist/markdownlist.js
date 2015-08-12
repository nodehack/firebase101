(function (angular) {
  'use strict';

  angular.module('markdownlist', ['myfirebase'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/markdownlist', {
          title: 'Markdowns',
          templateUrl: 'scripts/markdownlist/markdownlist.html',
          controller: 'MarkdownListController',
          controllerAs: 'view',
        });
    })
    .controller('MarkdownListController', function (MyFirebaseService) {
      var view = this;

      view.markdowns = MyFirebaseService.getMarkdowns();

      view.addMarkdown = function () {
        var authData = MyFirebaseService.getAuthenticationData();
        
        if (authData && view.name) {
          var newMarkdown = {
            name: view.name,
            createdByID: authData.uid,
            createdBy: authData.google.displayName,
            markdown: "",
            lastEditedBy: authData.google.displayName
          };

          view.markdowns.$add(newMarkdown).then(function () {
            view.name = null;
          });
        }
      };

    });

})(angular);
