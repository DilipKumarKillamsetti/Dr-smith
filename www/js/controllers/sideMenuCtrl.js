angular.module('drsmith.controllers.sideMenuCtrl', [])
.controller('sideMenuCtrl', function($scope,$rootScope,$state,$ionicHistory) {
  console.log("calling...");
  console.log($rootScope.hideTab)
  $scope.logout=function(){
   $ionicHistory.clearHistory()

    $state.go("login")
  }

  $scope.$on("$ionicView.beforeLeave", function()
  {
    if($rootScope.type=="mentor")
    {
      console.log($state.current.name)
      if($state.current.name == "app.home" || $state.current.name == "app.goals" || $state.current.name == "app.forum")
      {
        $rootScope.hideTab = false;
      }
      else
      {
        $rootScope.hideTab = true;
      }
    }
  })
  
  
  })