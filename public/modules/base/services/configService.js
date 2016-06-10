'use strict';

/* Services */
angular.module('mean').service('configService', function ($localStorage, $http, auth) {

  this.get = function () {
    if(!$localStorage.auth0_domain) {
      $http.get('/config')
        .then(function(res) {
          $localStorage.auth0_domain = res.data.auth0_domain;
          $localStorage.auth0_connection = res.data.auth0_connection;
          $localStorage.auth0_client_id = res.data.auth0_client_id;

          auth.init({
            domain: $localStorage.auth0_domain,
            clientID: $localStorage.auth0_client_id,
            loginUrl: '/login'
          });
        }, function(err) {
          console.log('Error getting config data: ', err);
        });
    }
  };
});
