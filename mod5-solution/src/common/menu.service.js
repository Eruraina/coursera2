(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  let user = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    var url = ApiPath + "/menu_items/" + shortName.toUpperCase() + ".json";
    return $http.get(url).then(
      function (response) {
        return response.data;
      }
    );
  }

  service.setInfo = function (info) {
    service.info = info;
  };

  service.getInfo = function() {
    return service.info;
  }
}
})();
