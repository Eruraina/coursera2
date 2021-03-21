(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiPath', 'https://davids-restaurant.herokuapp.com/menu_items.json')
  .directive('foundItems', FoundItems);

  // DIRECTIVE
  function FoundItems() {
    var ddo = {
      templateUrl: 'template.html',
      restrict: "E",
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: DirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };

    return ddo;
  }

  function DirectiveController() {
    var menu = this;

    menu.isNothingFound = function() {
      if (menu.items.length === 0) {
        return true;
      }
      return false;
    };
  }

  // CONTROLLER
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found = [];
    menu.found = MenuSearchService.getItems();

    menu.searchMenuItems = function () {
      if (menu.searchTerm === "") {
        MenuSearchService.clear();
      } else {
        MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        .then(function(result) {
          menu.found = result;
        });
      }
    }

    // Removing items
    menu.removeItem = function (index) {
      menu.found.splice(index, 1);

      // if (menu.found.length == 0) {
      //   menu.error = "Nothing found";
      // }
    };
  }

  // SERVICE
  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
      foundItems.splice(0, foundItems.length);
      if (searchTerm === "") {
        return foundItems;
      }

      return $http({
        method: "GET",
        url: ApiPath
      })
      .then(function (result) {
        var items = result.data.menu_items;
        foundItems.splice(0, foundItems.length);

        foundItems = descriptionFilter(items, searchTerm);
        return foundItems;
      });
    };

    function descriptionFilter(list, searchTerm) {
      var newList = [];

      for (var i = 0; i < list.length; i++) {
        if (list[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) > 0) {
          newList.push(list[i]);
        }
      }
      return newList;
    }

    service.clear = function() {
      foundItems.splice(0, foundItems.length);
    }

    service.getItems = function() {
      return foundItems;
    };
  }
})();
