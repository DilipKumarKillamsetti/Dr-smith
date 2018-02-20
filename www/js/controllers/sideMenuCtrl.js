angular.module('drsmith.controllers.sideMenuCtrl', [])
.controller('sideMenuCtrl', function($scope,$rootScope,$state,$ionicHistory,$http) {
  console.clear()
  console.log("calling...");
  console.log($rootScope.hideTab)
  $scope.logout=function(){
   $ionicHistory.clearHistory()

    $state.go("login")
  }
  //function for loading resources
  $scope.load_resources=function(){
    console.log("Resources ......")
    $http(
      {
          url:$rootScope.url+"/myproject/login_read.php",
          method:"GET",
          params:{id:$rootScope.id}
      })
    .then(function(response){
      $scope.files=response.data;
      console.log($scope.files)
   
  })
  }
  //function for profile display
  $scope.profile=function(){
    if($rootScope.type == "mentor") {
      console.log("Mentor Profile......")
    }
    if($rootScope.type == "mentee") {
      console.log("Mentee Profile......")
    }
    $http(
      {
          url:$rootScope.url+"/myproject/login_read.php",
          method:"GET",
          params:{id:$rootScope.id}
      })
    .then(function(response){
      $scope.files=response.data;
      console.log($scope.files)
  })
  }
  $scope.mentorslist=function(){
    console.log("Mentors List.....")
    $http(
      {
          url:$rootScope.url+"/myproject/login_read.php",
          method:"GET",
          params:{id:$rootScope.id}
      })
    .then(function(response){
      $scope.files=response.data;
      console.log($scope.files)
  }) 
  }
  $scope.$on("$ionicView.beforeLeave", function()
  {
    if($rootScope.type=="mentor")
    {
      console.log($state.current.name)
      if($state.current.name == "app.home" || $state.current.name == "app.goals" || $state.current.name == "app.forum"
      )
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