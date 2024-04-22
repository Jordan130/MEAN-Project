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
        .when('/login', {
            templateUrl: 'LoginID',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: 'RegisterID',
            controller: 'RegisterController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Define controllers

// Home Controller
bloggerApp.controller('HomeController', function() {
    var vm = this;
    vm.pageHeader = {
        title: "Jordan Rios's Blog Site"
    };
    vm.message = "Welcome to my Blog Site!";
});

// Blog List Controller
bloggerApp.controller('BlogListController', function($http, authentication) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };

    // Function to check if the current user is the creator of a blog post
    vm.isCreator = function(blog) {
        var currentUser = authentication.currentUser();
        return currentUser && blog.authorEmail === currentUser.email;
    };

     // Function to check if the user is authenticated
     vm.isAuthenticated = authentication.isLoggedIn();
     
    // Function to like a blog post
    vm.likeBlog = function(blog) {
        // Send like request to server
        $http.post('/api/blogs/' + blog._id + '/like')
            .then(function(response) {
                // Update like count in UI
                blog.likes = response.data.likes;
            })
            .catch(function(error) {
                console.error('Error liking blog post:', error);
            });
    };

    // Fetch blogs with like counts
    $http.get('/api/blogs')
        .then(function(response) {
            vm.blogs = response.data;
        })
        .catch(function(error) {
            vm.message = "Could not get list of blogs";
        });
});

// Blog Add Controller
bloggerApp.controller('BlogAddController', function($http, $location, authentication) {
    var vm = this;

    vm.addBlog = function() {
        var newBlog = {
            title: vm.newBlogTitle,
            text: vm.newBlogText,
            authorName: authentication.currentUser().name,
            authorEmail: authentication.currentUser().email
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

// Blog Edit Controller
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

// Blog Delete Controller
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