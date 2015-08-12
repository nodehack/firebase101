(function (angular) {
  'use strict';

  angular.module('myfirebase', ['firebase'])
  .service('MyFirebaseService', function ($q, $firebaseArray) {
    var ref = new Firebase('https://fb101.firebaseio.com');

    this.authenticate = function () {
      var deferred = $q.defer();

      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(authData);
        }
      });

      return deferred.promise;
    };

    this.unAuthenticate = function () {
      ref.unauth();
    };

    this.getAuthenticationData = function () {
      return ref.getAuth();
    };

    this.getMarkdowns = function () {
      return $firebaseArray(ref.child('markdowns'));
    };

  });

})(angular);
