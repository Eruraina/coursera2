(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.outputMessage = "";
  $scope.inputString = "";
  $scope.messageClass = "";
	$scope.textClass = "";

  $scope.dishesCheck = function () {
    var numOfDishes = 0;
    var stringToSplit = $scope.inputString;

    if (stringToSplit != null) {
      var splitString = stringToSplit.split(',');
      console.log(splitString);

      for (var i = 0; i < splitString.length; i++) {
        if (splitString[i].trim() != "") {
          numOfDishes++;
        } else {
          numOfDishes += 0;
        }
      }
      $scope.numOfDishes = numOfDishes;

      if ($scope.numOfDishes >= 1 && $scope.numOfDishes <= 3) {
        $scope.outputMessage = "Enjoy!"
        $scope.messageClass = "green";
      	$scope.textClass = "border-green";
      } else if ($scope.numOfDishes > 3) {
        $scope.outputMessage = "Too Much!";
        $scope.messageClass = "green";
      	$scope.textClass = "border-green";
      } else {
        $scope.outputMessage = "Please enter data first!";
        $scope.messageClass = "red";
      	$scope.textClass = "border-red";
      }

    } else {
      var splitString = "";
      $scope.numOfDishes = 0;
      $scope.outputMessage = "Please enter data first!";
      $scope.messageClass = "red";
    	$scope.textClass = "border-red";
    }
    console.log($scope.numOfDishes);
  };


}




})();
