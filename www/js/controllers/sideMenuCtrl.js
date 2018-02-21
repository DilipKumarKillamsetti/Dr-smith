angular.module('drsmith.controllers.sideMenuCtrl', [])
.controller('sideMenuCtrl', function($scope,$rootScope,$state,$ionicHistory,$http,$window) {
  //console.clear()
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
          url:$rootScope.url+"/myproject/resource.php",
          method:"GET",
          params:{id:$rootScope.id,type:$rootScope.type}
      })
    .then(function(response){
      $scope.files=response.data
      console.log(response.data)
   
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
          url:"http://192.168.1.158/myproject/myprofile.php",
          method:"GET",
          params:{phone_no:$rootScope.phoneno}
      })
    .then(function(response){
      $scope.details=response.data;
      console.log($scope.details)
  })
  }

$scope.editable=true;
$scope.edit_profile=function(){
  $scope.editable=false;
  console.log(".........edit.......profile", $scope.editable)
  var password = $window.document.getElementById('password');
  var hobbies = $window.document.getElementById('hobbies');
  var likes = $window.document.getElementById('likes');
  var dislikes = $window.document.getElementById('dislikes');
  var aboutme = $window.document.getElementById('aboutme');
  var intrests = $window.document.getElementById('interests');

  password.focus();
  hobbies.focus();
  likes.focus();
  dislikes.focus();
  aboutme.focus();
  intrests.focus();
}

$scope.update_profile=function(password,hobbies,likes,dislikes,intrests,aboutme){ 
  console.log(password,hobbies,likes,dislikes,intrests,aboutme);
  console.log($rootScope.phoneno)
  $http(
    {
        url:$rootScope.url+"/myproject/edit_profile.php",
        method:"GET",
        params:{phone_no:$rootScope.phoneno,interests:intrests,likes:likes,hobbies:hobbies,
          dislikes:dislikes,password:password,about_me:aboutme}
    })
  .then(function(response){
    console.log(response.data)
})
$scope.editable=true;
}

  $scope.mymentor=function(){
    if($rootScope.type=="mentee"){
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
  }
  //functon for mentor to list all the other mentors
  $scope.mentorslist=function(){
    console.log("Mentors List.....",$rootScope.phoneno)
    $http(
      {
          url:$rootScope.url+"/myproject/mentor_list.php",
          method:"GET",
          params:{phone_no:$rootScope.phoneno}
      })
    .then(function(response){
      $scope.mentors=response.data;
      console.log(response.data)
  }) 
  }
  $scope.$on("$ionicView.beforeLeave", function()
  {
    if($rootScope.type=="mentor")
    {
      console.log($state.current.name)
      if($state.current.name == "app.home" || $state.current.name == "app.goals" || $state.current.name == "app.mentorforum"
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