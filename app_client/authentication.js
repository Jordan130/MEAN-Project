var app = angular.module('bloggerApp');

//*** Authentication Service and Methods **
app.service('authentication', ['$window', '$http', function($window, $http) {
  var saveToken = function(token) {
    $window.localStorage['blog-token'] = token;
    console.log('Token saved:', token); // Log the saved token
};

  var getToken = function() {
      return $window.localStorage['blog-token'];
  };

  var register = function(user) {
      return $http.post('/api/register', user).then(function(response) {
          saveToken(response.data.token);
      });
  };

  var login = function(user) {
      return $http.post('/api/login', user).then(function(response) {
          saveToken(response.data.token);
      });
  };

  var logout = function() {
      $window.localStorage.removeItem('blog-token');
  };

  var isLoggedIn = function() {
    var token = getToken();
    if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log('Token payload:', payload); // Log the decoded token payload
        console.log('Current timestamp:', Date.now() / 1000); // Log the current timestamp
        console.log('Token expiration timestamp:', payload.exp); // Log the token expiration timestamp
        var isTokenValid = payload.exp > Date.now() / 1000;
        console.log('Is token valid:', isTokenValid); // Log whether the token is valid
        return isTokenValid;
    }
    console.log('No token found.');
    return false;
};

  var currentUser = function() {
      if (isLoggedIn()) {
          var token = getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return {
              email: payload.email,
              name: payload.name
          };
      }
  };

  return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
  };
}]);

app.controller('LoginController', ['$http', '$location', 'authentication', function LoginController($http, $location, authentication) {
  var vm = this;
  vm.credentials = { email: "", password: "" };
  vm.returnPage = $location.search().page || '/';

  vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
          vm.formError = "All fields required, please try again";
          return false;
      } else {
          vm.doLogin();
      }
  };

  vm.doLogin = function() {
      vm.formError = "";
      authentication.login(vm.credentials)
          .then(function() {
              $location.search('page', null);
              $location.path(vm.returnPage);
          })
          .catch(function(err) {
              vm.formError = err.data.message;
          });
  };
}]);

app.controller('RegisterController', ['$http', '$location', 'authentication', function RegisterController($http, $location, authentication) {
    var vm = this;
    vm.credentials = { name: "", email: "", password: "" };
    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
            vm.formError = "All fields required, please try again";
            return false;
        } else {
            vm.doRegister();
        }
    };

    vm.doRegister = function() {
        vm.formError = "";
        authentication.register(vm.credentials)
            .then(function() {
                $location.search('page', null);
                $location.path(vm.returnPage);
            })
            .catch(function(err) {
                vm.formError = "Error registering. Try again with a different email address.";
            });
    };
}]);