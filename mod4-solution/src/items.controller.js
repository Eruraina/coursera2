(function () {
  'use sttrict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['itemsList'];
  function ItemsController(itemsList) {
    this.itemsList = itemsList.menu_items;
    this.categoriesName = itemsList.category.name;
  }
})();
