'use strict';

(function () {

  function AuthService($rootScope, $q, $http, $cookieStore, $location, Util, api) {

    var safeCb = Util.safeCb;
    var currentUser = {};

    $rootScope.current = $rootScope.current || {};

    if ($cookieStore.get('token') && $location.path() !== '/logout') {
      currentUser = api.user.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('http://localhost:9000/auth/local', {
          email: user.email,
          password: user.password
        }).
          success(function (data) {
            $cookieStore.put('token', data.token);
            currentUser = api.user.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
      isLoggedIn: function (callback) {
        var ret = false;

        if ($cookieStore.get('token')) {
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

      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('_id')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
      },

    }

    return Auth;

  }

  angular.module('app.auth')
    .factory('Auth', AuthService);

})();
