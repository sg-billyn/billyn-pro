'use strict';

(function () {

  function AuthService($rootScope, $q, $cookies, $location, Util, api) {

    var safeCb = Util.safeCb;
    var currentUser = {};

    $rootScope.current = $rootScope.current || {};

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = api.User.get();
    }

    var Auth = {
      /*
      login: function ({loginId, password}, callback) {
        return $http.post('http://localhost:9000/api/auth/local', {
          //email: email,
          loginId: loginId,
          password: password
        })
      },*/

      /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
      isLoggedIn: function (callback) {
        var ret = false;

        if($cookies.get('token')){
          ret = true;
        }
        return $q.when(ret);

        /*
        if (arguments.length === 0) {
          //return currentUser.hasOwnProperty('role');
          return currentUser.hasOwnProperty('_id');
        }

        return Auth.getCurrentUser(null)
          .then(user => {
            //var is = user.hasOwnProperty('role');
            var is = user.hasOwnProperty('_id');
            safeCb(callback)(is);
            return is;
          });*/
      },

      isLoggedInAsync: function(cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('_id')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      logout: function () {
        $cookies.remove('token');
        currentUser = {};
      },

    }

    return Auth;

  }

  angular.module('app.auth')
    .factory('Auth', AuthService);

})();
