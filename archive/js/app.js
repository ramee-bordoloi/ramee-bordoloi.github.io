 angular.module('Ramee', ['ngRoute', 'jkuri.gallery']);

 angular.module('Ramee')
.controller('AboutController', function ($scope, $rootScope) {
    $rootScope.backgroundElClass = 'about';
});

angular.module('Ramee')
    .run(function($rootScope, $location){
        $rootScope.isActive = function (viewLocation) { 
            return $location.path().indexOf(viewLocation) == 0;
        };
    });

 angular.module('Ramee')
.factory('projects', function (files_list) { 
    return files_list.children.map(function(d){
        return {
            name : d.name,
            files : d.children.map(function(d){
                return {
                    description : d.name.substring(0, d.name.length - 4).replace(/_/g,' '),
                    img : d.path,
                    thumb : d.path.replace("images/works/", "images/works_thumbs/"),
                    thumbSmall : d.path.replace("images/works/", "images/works_thumbs_small/"),
                }
            })
        }
    });
});
 
 angular.module('Ramee')
 .controller('ProjectController', function ($scope, projects,$location,$rootScope, $routeParams) {

    $rootScope.backgroundElClass = 'works';

    $scope.project = projects.find(function(d){
        return d.name == decodeURIComponent($routeParams.project);
    });

    $scope.goToWorks = function(project){
        $location.path('works');
    }

    // $scope.getCssUrl = function(url){
    //     return 'url("' + url + '")';
    // }

    // console.log(project);

 });

 angular.module('Ramee')
 .controller('WorksController', function ($scope, projects, $location, $rootScope) {
    $scope.projects = projects;

    $rootScope.backgroundElClass = 'works';

    $scope.goToProject = function(project){
        $location.path('project/'+ encodeURIComponent(project));
    }

    $scope.getCssUrl = function(url){
        return 'url("' + url + '")';
    }

 });
// angular.module('Ramee').run(function($rootScope){
//     $rootScope.backgroundElClass = '/images/ramee.jpg';

// })

angular.module('Ramee')
    .filter('filterBySearchText', function() {
        return function(items, searchText, property, exclude) {
            searchText = searchText || '';
            var properties = property.split(".");
            var accessor = function(obj, properties){
                return properties.reduce(function(a, b, i){
                    return a && a[b] && a[b] || undefined; 
                }, obj); 
            }
            return items && items.filter(function(d){
                var predicate = accessor(d, properties).toLowerCase().indexOf(searchText.toLowerCase()) > -1;
                return exclude ? !predicate : predicate;
            });
        };
    });

 angular.module('Ramee')
 .controller('ContactController', function ($scope, $rootScope) {
    $rootScope.backgroundElClass = 'contact';

 });

 angular.module('Ramee')
.config(function ($routeProvider) {
    $routeProvider.
    when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutController'
    }).
    when('/works', {
        templateUrl: 'templates/works.html',
        controller: 'WorksController'
    }).
    when('/project/:project', {
        templateUrl: 'templates/project.html',
        controller: 'ProjectController'
    }).
    when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'ContactController'
    }).
    otherwise({
        redirectTo: '/about'
    });
});