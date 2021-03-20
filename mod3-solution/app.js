(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com/")
  .directive('foundItems', FoundItems);

  // DIRECTIVE
  function FoundItems() {
    var ddo = {
      templateUrl: 'template.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  function DirectiveController() {
    var ctrl = this;
    ctrl.empty = function () {
      if (ctrl.foundItems.length === 0 && ctrl.foundItems !== 'undefined') {
        return true;
      }
      return false;
    };
  }

  // CONTROLLER
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchTerm = "";
    menu.found = [];

    menu.getMatchedMenuItems = function () {
      menu.found = [];
      if (menu.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function (response) {
          menu.found = response.data;
        })
        .catch(function (error) {
          console.log("Something went wrong.");
        });
      }
    };

    // Removing items
    menu.removeItem = function (index) {
      menu.found.splice(index, 1);

      if (menu.found.length == 0) {
        menu.error = "Nothing found";
      }
    };
  }

  // SERVICE
  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      })
      .then(function (result) {
        var items = result.data.menu_items;
        var foundItems = [];

        for (var index = 0; index < items.length; index++) {
          if (items[index].description.indexOf(searchTerm) > 0) {
            foundItems.push(items[index]);
          }
        }
        return foundItems;
      });
    };
  }
})();
