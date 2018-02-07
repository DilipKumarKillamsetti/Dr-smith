angular.module('drsmith.controllers.loginctrl', [])
.controller('loginctrl', function($scope, $http, $state,$rootScope) {
    $rootScope.url = "http://192.168.1.158";
    $scope.redirect=function(Email,Password){
                console.log(Email)
                console.log(Password)
                $http(
                  {
                    url: $rootScope.url+"/myproject/login1.php",
                    method:"GET",
                    params:{username:Email,password:Password}
                  })
                  .then(function(response){
                    $scope.result=response.data;
                    console.log( $scope.result)
                    $rootScope.type=$scope.result.type;
                     $rootScope.id=$scope.result.row.id;
                    // $rootScope.name=$scope.result.row.name;
                     console.log($rootScope.id)
                     console.log( $rootScope.type)
                     $rootScope.name=Email;
                     if($rootScope.type=="mentor")
                     {
                      $state.go("app.home");
                      $rootScope.name=$scope.result.row.name;
                       $rootScope.hideTab=false;
                     }
                     else
                     {
                       $rootScope.mentor_id=$scope.result.row.mid;
                       $state.go("app.mentee_home")
                       $rootScope.hideTab=true;
                     }
                   
                  })
                 
    }
  })