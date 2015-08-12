(function (angular) {
  'use strict';

  angular.module('header', ['myfirebase'])
  .controller('HeaderController', function (MyFirebaseService) {
    var header = this;
    header.authData = MyFirebaseService.getAuthenticationData();

    header.login = function () {
      MyFirebaseService.authenticate().then(function (authData) {
        console.log(JSON.stringify(authData, null, 4));
        header.authData = authData;
      });
    };

    header.logout = function () {
      MyFirebaseService.unAuthenticate();
      header.authData = null;
    };

  });
})(angular);
