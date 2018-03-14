angular.module('drsmith.controllers.messageCtrl', [])
.controller('messageCtrl',function($scope,$http,$timeout,$interval,$rootScope,$stateParams,$state,$ionicModal){


$scope.Refresh_Messages=function(){
    console.log('Getting Messages Between mentor and mentee......');
    $timeout($scope.initial(),1500)
}

    $scope.msgObj={
        text:""
    };

   
   $scope.promise= $interval(function(){
        $scope.initial();
      }, 10000)


      $scope.$on("$ionicView.leave", function(){
        $interval.cancel( $scope.promise);
      })
    
    $scope.fun=function(sender_id){
            console.clear();
            console.log(localStorage.getItem('phoneno'))
        
        if (sender_id == localStorage.getItem('phoneno')) {
                
                           $('#this').addClass('shz-reciever-msg');
        }
      
    };

    $scope.initial=function(){
       $scope.phone_no =  localStorage.getItem('phoneno')
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
        if(localStorage.getItem('type')=="mentor"){
            var conversation_id = reciever_id;
        }
        else{
            var conversation_id = localStorage.getItem('phoneno');
        }
        console.log("reciever phone no"+reciever_id,"reciever name"+reciever_name)
        console.log("sender phone no"+localStorage.getItem('phoneno'),"sender name"+localStorage.getItem('name'))
        $http({
                url:localStorage.getItem('url')+"/myproject/add_message.php",
                method:"GET",
                params:{sender_id:localStorage.getItem('phoneno'),sender_name:localStorage.getItem('name'),
                    receiver_id:reciever_id,receiver_name:reciever_name,message:$scope.msgObj.text,
                    conversation_id:conversation_id}
            })
            .then(function(response){
                console.log(response.data)
                $scope.msgObj={
                    text:""
                };
            })
    }


    $scope.get_getmessages=function(reciever_id){
        if(localStorage.getItem('type')=="mentor"){
            var conversation_id = reciever_id;
        }
        else{
            var conversation_id = localStorage.getItem('phoneno');
        }
        console.log("reciever phone no"+reciever_id)
        console.log("sender phone no"+localStorage.getItem('phoneno'))
        console.log("conversation id(mentee phone no):"+conversation_id)
        $http(
            {
                url:localStorage.getItem('url')+"/myproject/view_messages.php",
                method:"GET",
                params:{ conversation_id:conversation_id  }
            })
            .then(function(response){
                $scope.messages=response.data;
                console.log(response.data)
                $scope.$broadcast('scroll.refreshComplete');
            })
    }

  
    
})