angular.module('drsmith.controllers.forumTabctrl', [])
.controller('forumTabctrl',function($scope,$rootScope,$http,$stateParams){

    $scope.get_discussions_mentorforum=function(){
        console.log("....mentor discussions")
        $http(
            {
              url: $rootScope.url+"/myproject/",
              method:"GET",
              params:{}
            })
    }

    $scope.get_discussions_openforum=function(){
        console.log("....open discussions")
        $http(
            {
              url: $rootScope.url+"/myproject/",
              method:"GET",
              params:{}
            })
    }


})