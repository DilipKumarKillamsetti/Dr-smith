angular.module('drsmith.controllers.forumTabctrl', [])
.controller('forumTabctrl',function($scope,$rootScope,$http,$stateParams,$timeout){


    $scope.doRefresh_mentorForum=function(){
        console.log('Getting Mentor forum disscussions.....Begin async operation......');
        $timeout($scope.get_discussions_mentorforum(),1500)
      }

      $scope.doRefresh_openForum=function(){
        console.log('Getting Open forum disscussions Begin async operation......');
        $timeout($scope.get_discussions_openforum(),1500)
      }

      $scope.doRefresh_MentorForum_comments=function(){
        console.log('Getting Open Mentor disscussion Comments Begin async operation......');
        $timeout($scope.get_comment_mentor_forum(),1500)
      }

      $scope.doRefresh_OpenForum_comments=function(){
        console.log('Getting Open forum disscussion comments Begin async operation......');
        $timeout($scope.get_comment_open_forum(),1500)
      }


    $scope.discussionObj={
        text:""
    };

    $scope.hidepage=true;
    $scope.add_discussion_mentorforum=function(){
        if($scope.discussionObj.text.length>0){
        $http(
            {
              url: localStorage.getItem('url')+"/myproject/mentor_forum.php",
              method:"GET",
              params:{started_by:localStorage.getItem('name'),mentor_id:localStorage.getItem('id'),discussion_text:$scope.discussionObj.text}
            })
            .then(function(response){
                console.log(response.data)
                $scope.discussionObj={
                    text:""
                };
                $scope.get_discussions_mentorforum();
            })
   }
   else{
       alert("enter text")
   } 
}

    $scope.get_discussions_mentorforum=function(){
        console.log("....mentor discussions",localStorage.getItem('phoneno'))
        $http(
            {
              url: localStorage.getItem('url')+"/myproject/view_mentor_forum.php",
              method:"GET",
              params:{phone_no:localStorage.getItem('phoneno')}
            })
            .then(function(response){
                console.log(response.data)
                $scope.discussions=response.data;
                $scope.$broadcast('scroll.refreshComplete');
                $scope.hidepage=false;
            })
    }

    $scope.get_comment_mentor_forum=function(){
        console.log( $stateParams.id)
        $http(
         {
           url: localStorage.getItem('url')+"/myproject/view_mentor_forum_messages.php",
           method:"GET",
           params:{discussion_id:$stateParams.id}
         })
         .then(function(response){
             console.log(response.data)
             $scope.comments=response.data;
             $scope.hidepage=false;
             $scope.$broadcast('scroll.refreshComplete');
         })
     }
     $scope.commentObj={
         text:""
     };
     $scope.add_comment_mentor_forum=function(){
         console.log( $stateParams.id)
         if($scope.commentObj.text.length>0){
         $http(
          {
            url: localStorage.getItem('url')+"/myproject/mentor_forum_message.php",
            method:"GET",
            params:{discussion_id:$stateParams.id,commentor_id:localStorage.getItem('id'),
             comment_text:$scope.commentObj.text , comment_by:localStorage.getItem('name')}
          })
          .then(function(response){
              console.log(response.data)
              $scope.commentObj={
                 text:""
             };
             $scope.get_comment_mentor_forum();
          })
             }
             else{
                 alert("enter text")
             }
     }

     
    $scope.add_discussion_openforum=function(){
        console.log(localStorage.getItem('name'))
        console.log(localStorage.getItem('id'))
        console.log(localStorage.getItem('type'))
        console.log($scope.discussionObj.text)
        if($scope.discussionObj.text.length>0) {
            $http(
            {
              url: localStorage.getItem('url')+"/myproject/open_forum.php",
              method:"GET",
              params:{started_by:localStorage.getItem('name'),started_by_id : localStorage.getItem('id'),
                started_by_type : localStorage.getItem('type') , discussion_text : $scope.discussionObj.text}
            })
            .then(function(response){
                console.log(response.data)
                $scope.discussionObj={
                    text:""
                };
                $scope.get_discussions_openforum();
            })
        }
        else{
            alert("enter text")
        }
    }

    $scope.get_discussions_openforum=function(){
        console.log("....Display open discussions")
        $http(
            {
              url: localStorage.getItem('url')+"/myproject/view_open_forum.php",
              method:"GET",
              params:{}
            })
            .then(function(response){
                console.log(response.data)
                $scope.discussions=response.data;
                $scope.hidepage=false;
                $scope.$broadcast('scroll.refreshComplete');
            })

    }
    $scope.get_comment_open_forum=function(){
       console.log( $stateParams.id)
       $http(
        {
          url: localStorage.getItem('url')+"/myproject/view_open_forum_messages.php",
          method:"GET",
          params:{discussion_id:$stateParams.id}
        })
        .then(function(response){
            console.log(response.data)
            $scope.comments=response.data;
            $scope.hidepage=false;
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    $scope.commentObj={
        text:""
    };
    $scope.add_comment_open_forum=function(){
        console.log( $stateParams.id)
        if($scope.commentObj.text.length>0) {    
        $http(
         {
           url: localStorage.getItem('url')+"/myproject/open_forum_message.php",
           method:"GET",
           params:{discussion_id:$stateParams.id , commentor_id:localStorage.getItem('id') , commentor_type:localStorage.getItem('type'),
            comment_text:$scope.commentObj.text , comment_by:localStorage.getItem('name')}
         })
         .then(function(response){
             console.log(response.data)
             $scope.commentObj={
                text:""
            };
            $scope.get_comment_open_forum();
         })
        }
        else{
            alert("enter text")
        }
     }


})