angular.module('drsmith.controllers.homeTabCtrl', [])
.controller('HomeTabCtrl', function($scope,$rootScope,$http) {  
  console.log(localStorage.getItem('url'))
    $http(
      {
          url:localStorage.getItem('url')+"/myproject/login_read.php",
          method:"GET",
          params:{id:localStorage.getItem('id')}
      }
    )
    .then(function(response){
      $scope.mentees=response.data;
       console.log(response)
      console.log($scope.mentees)
  
    });
  })