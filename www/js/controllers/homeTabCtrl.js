angular.module('drsmith.controllers.homeTabCtrl', [])
.controller('HomeTabCtrl', function($scope,$rootScope,$timeout,$http) {  



  $scope.Refresh=function(mentee_id){
    console.log('Mentee List refresh Begin async operation......');
    $timeout($scope.Mentee_List(),1500)
  }

  console.log(localStorage.getItem('url'))


$scope.Mentee_List=function(){
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
      $scope.$broadcast('scroll.refreshComplete');
  
    })
  }
  })