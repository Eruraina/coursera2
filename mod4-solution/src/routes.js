(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // UI states
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories page
  .state('categoriesList', {
    url: '/category-list',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController',
    controllerAs: 'controller',
    resolve: {
      categoriesList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Menu items page
  .state('itemsList', {
    url: '/items/{shortName}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController',
    controllerAs: 'controller',
    resolve: {
      itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  })
}

})();
