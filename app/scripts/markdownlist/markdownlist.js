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
    .controller('MarkdownListController', function (MyFirebaseService, $location) {
      var view = this;

      view.markdowns = MyFirebaseService.getMarkdowns();
      view.allowOthersToEdit = true;

      view.addMarkdown = function () {
        var authData = MyFirebaseService.getAuthenticationData();

        if (authData && view.name) {
          var newMarkdown = {
            name: view.name,
            createdByID: authData.uid,
            createdBy: authData.google.displayName,
            markdown: "",
            lastEditedBy: authData.google.displayName,
            allowOthersToEdit: view.allowOthersToEdit ? true : false
          };

          view.markdowns.$add(newMarkdown).then(function () {
            view.name = null;
          });
        }
      };

      view.deleteMarkdown = function (markdown) {
        view.markdowns.$remove(markdown);
      };

      view.goToEdit = function (markdown) {
        $location.path('/markdown/' + markdown.$id);
      };

      view.goToView = function (markdown) {
        $location.path('/markdown/view/' + markdown.$id);
      };

    });

})(angular);
