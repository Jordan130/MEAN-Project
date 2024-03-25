var bloggerApp = angular.module('bloggerApp', ['ngRoute']);

// Configure routing
bloggerApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'homeID',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/blogList', {
            templateUrl: 'blogListID',
            controller: 'BlogListController',
            controllerAs: 'vm'
        })
        .when('/blogAdd', {
            templateUrl: 'blogAddID',
            controller: 'BlogAddController',
            controllerAs: 'vm'
        })
        .when('/blogEdit/:id', {
            templateUrl: 'blogEditID',
            controller: 'BlogEditController',
            controllerAs: 'vm'
        })
        .when('/blogDelete/:id', {
            templateUrl: 'blogDeleteID',
            controller: 'BlogDeleteController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Define controllers
bloggerApp.controller('HomeController', function() {
    var vm = this;
    vm.pageHeader = {
        title: "Jordan Rios's Blog Site"
    };
    vm.message = "Welcome to my Blog Site!";
});

bloggerApp.controller('BlogListController', function($http) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };

    $http.get('/api/blogs')
        .then(function(response) {
            vm.blogs = response.data;
        })
        .catch(function(error) {
            vm.message = "Could not get list of blogs";
        });
});

bloggerApp.controller('BlogAddController', function($http, $location) {
    var vm = this;

    vm.addBlog = function() {
        var newBlog = {
            title: vm.newBlogTitle,
            text: vm.newBlogText
        };
        $http.post('/api/blogs', newBlog)
            .then(function(response) {
                // Redirect to blog list after adding
                $location.path('/blogList');
            })
            .catch(function(error) {
                console.error('Error adding blog:', error);
            });
    };
});

bloggerApp.controller('BlogEditController', function($http, $routeParams, $location) {
    var vm = this;
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Blog Edit'
    };

    // Fetch the blog data
    $http.get('/api/blogs/' + vm.id)
        .then(function(response) {
            vm.blog = response.data;
            vm.message = "Blog data found!";
        })
        .catch(function(error) {
            vm.message = "Could not get blog with id: " + vm.id;
        });

    // Function to save the edited blog
    vm.saveBlog = function() {
        $http.put('/api/blogs/' + vm.id, vm.blog)
            .then(function(response) {
                // Redirect to blog list after updating
                $location.path('/blogList');
            })
            .catch(function(error) {
                console.error('Error updating blog:', error);
            });
    };
});

bloggerApp.controller('BlogDeleteController', function($http, $routeParams, $location) {
    var vm = this;
    vm.id = $routeParams.id;

    // Fetch the blog data to display
    $http.get('/api/blogs/' + vm.id)
        .then(function(response) {
            vm.blog = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching blog data:', error);
        });

    // Function to delete the blog
    vm.deleteBlog = function() {
        $http.delete('/api/blogs/' + vm.id)
            .then(function(response) {
                // Redirect to blog list after deletion
                $location.path('/blogList');
            })
            .catch(function(error) {
                console.error('Error deleting blog:', error);
            });
    };
});

