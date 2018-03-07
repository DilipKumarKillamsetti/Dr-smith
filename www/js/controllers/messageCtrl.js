angular.module('drsmith.controllers.messageCtrl', [])
.controller('messageCtrl',function($scope,$http,$rootScope,$stateParams,$state,$ionicModal){

    $scope.msgObj={
        text:""
    };

   

    $scope.initial=function(){
        if(localStorage.getItem('type')=='mentor'){
            $scope.reciever_name=$stateParams.reciever_name;
            $scope.reciever_id = $stateParams.reciever_id;
            console.log($scope.reciever_id,$scope.reciever_name)
            $scope.get_getmessages($scope.reciever_id)
        }
        else{
                $http(
                  {
                      url:localStorage.getItem('url')+"/myproject/my_mentor.php",
                      method:"GET",
                      params:{phone_no:localStorage.getItem('phoneno')}
                  })
                .then(function(response){
                 $scope.reciever_id=response.data.phone_no;
                 $scope.reciever_name=response.data.name;
                 console.log(response.data)
                 console.log($scope.reciever_id,$scope.reciever_name)
                 $scope.get_getmessages($scope.reciever_id)
              })  
        }
        

    }
   
    $scope.send_message=function(reciever_id,reciever_name){
        console.log(reciever_id,reciever_name)
        console.log(localStorage.getItem('phoneno'),localStorage.getItem('name'))
        $http({
                url:$rootScope.url+"/myproject/add_message.php",
                method:"GET",
                params:{sender_id:localStorage.getItem('phoneno'),sender_name:localStorage.getItem('name'),
                    reciever_id:reciever_id,receiver_name:reciever_name,message:$scope.msgObj.text}
            })
            .then(function(response){
                console.log(response.data)
                $scope.msgObj={
                    text:""
                };
            })
    }


    $scope.get_getmessages=function(reciever_id){
        console.log(reciever_id)
        $http(
            {
                url:$rootScope.url+"/myproject/view_messages.php",
                method:"GET",
                params:{sender_id:localStorage.getItem('phoneno'),reciever_id:reciever_id}
            })
            .then(function(response){
                $scope.messages=response.data;
                console.log(response.data)
            })
    }

  
    
})