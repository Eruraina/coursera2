(function () {
  'use strict';


  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.setItems();
    toBuy.bought = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }



  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [{
      name: "cookies",
      quantity: 10
    }, {
      name: "beers",
      quantity: 5
    }, {
      name: "sodas",
      quantity: 2
    }, {
      name: "chocolates",
      quantity: 4
    }, {
      name: "twizzlers",
      quantity: 20
    }];

    var boughtItems = [];

    // Move items to bought list
    service.buyItem = function (itemIndex) {
      var item = itemsToBuy[itemIndex];
      service.moveBoughtItem(item);
      removeBoughtItem(itemIndex);
    };

    service.setItems = function () {
      return itemsToBuy;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.moveBoughtItem = function (item) {
      boughtItems.push(item);
    };

    function removeBoughtItem(itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
    };

  }
})();
