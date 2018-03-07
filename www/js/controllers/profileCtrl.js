angular.module('drsmith.controllers.profileCtrl', [])
.controller('profileCtrl',function($scope,$http,$rootScope,$timeout,$stateParams,$state,$ionicModal){


  $scope.refresh_profile=function(){
    console.log('Refreshing Profile......Begin async operation......');
    $timeout($scope.profile(),1500)
  }



//function for profile display
$scope.profile=function(){
    
    $http(
      {
          url:localStorage.getItem('url')+"/myproject/myprofile.php",
          method:"GET",
          params:{phone_no:$rootScope.phoneno}
      })
    .then(function(response){
        $scope.details=response.data;
      console.log($scope.details)
      $scope.$broadcast('scroll.refreshComplete');
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
  console.log(localStorage.getItem('phoneno'))
  $http(
    {
        url:localStorage.getItem('url')+"/myproject/edit_profile.php",
        method:"GET",
        params:{ phone_no:localStorage.getItem('phoneno') ,
          type:localStorage.getItem('type'), interests : intrests , likes : likes , hobbies : hobbies,
          dislikes:dislikes,password:password,about_me:aboutme}
    })
  .then(function(response){
    console.log(response.data)
})
$scope.editable=true;
}

})