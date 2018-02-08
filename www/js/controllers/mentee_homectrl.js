angular.module('drsmith.controllers.mentee_homectrl', [])
.controller('mentee_homectrl',function($scope,$rootScope,$http,$stateParams,$ionicModal){
  //modal for add mentee goals 
  $ionicModal.fromTemplateUrl('templates/add_mentee_goals.html',{
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal){
    $scope.modal=modal;
        });
  $scope.openModal = function()
   { 
     $scope.modal.show(); 
  };
   $scope.closeModal = function()
    {
    $scope.modal.hide();
    };
    //modal for add interactions in the mentee_home page
    $ionicModal.fromTemplateUrl('templates/add_mentee_interactions.html',{
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal){
      $scope.modal1=modal;
          });
    $scope.openModal_interactions = function()
     { 
       $scope.modal1.show(); 
    };
     $scope.closeModal_interactions = function()
      {
      $scope.modal1.hide();
      };
      //modal for add interactions in the interaction page
      


      //funuction for getting mentee details in the mentee_home page
      $scope.get=function(){
          $http({
              url:$rootScope.url+"/myproject/mentee_details.php",
              method:"GET",
              params:{id:$rootScope.id}
          })
          .then(function(response){
              $scope.mentee=response.data;
              console.log($scope.mentee)
          })
      }
     // function for mentee to get the goals(self)
      $scope.getgoals=function(){
          // console.log($rootScope.id)
          $http(
          {
            url:$rootScope.url+"/myproject/mentee-goal.php",
            method:"GET",
            params:{id:$rootScope.id}
          })
          .then(function(response){
            $scope.goals=response.data;
            console.log($scope.goals)
      
          }
        )
      }
      var base64=null;
      var name=null;
  // function for mentee to add the goals(self)
    $scope.addgoal=function(goal,files,date1){
      console.log(goal)
      console.log(date1)
      console.log($rootScope.id)
      var selectedfile = document.getElementById("inputFile").files;
      console.log(selectedfile)
      if(selectedfile.length < 1 && goal==undefined)
      {
        // pop up
        alert("selelct value");
      }
      else if(selectedfile.length>0){
            
      name = selectedfile[0].name;
        var filetoload=selectedfile[0];
        alert(selectedfile[0].name, "calling...")
        var fileReader= new FileReader();
        alert(fileReader)
        fileReader.readAsDataURL(filetoload);
        fileReader.onload=function(fileLoadedEvent){
          base64=fileLoadedEvent.target.result;
          $scope.fun(goal,date1);   
        }
    }
    else
    { 
      $scope.fun(goal,date1);
    }
    }
       //sub function for the mentee to add goal with file   
    $scope.fun=function(goal,date1){
      console.log(goal);
      console.log(date1);
      $scope.formattedDate = moment(date1).format('YYYY-MM-DD');
      console.log($scope.formattedDate);
      $http(
        {
          url:$rootScope.url+"/myproject/add_mentee_goal_with_file.php",
            method:"POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:{id:$rootScope.id,name:name,goal:goal,shab:base64,
              mentor_id:$rootScope.mentor_id,due_date:$scope.formattedDate}
      })
      .then(function(response){
        $scope.goals=response;
    console.log($scope.goals)
          $scope.getgoals();
          $scope.new_goal=null;
        }
      )
      .catch(function(e){
        alert(e)
      })
      document.getElementById("goal").value="";
          }
        //function for getting comments for the mentee goals
      $scope.getcomments=function(){
          console.log($rootScope.id)
          console.log($stateParams.goal_id)
        $http({
            url:$rootScope.url+"/myproject/mentee_goals_comment.php",
            method:"GET",
            params:{id:$rootScope.id,mentee_goal_id:$stateParams.goal_id}
        })
        .then(function(response){
            $scope.goal_comments=response.data.comment;
            $scope.goal=response.data.goal;
            console.log( $scope.goal_comments)
            console.log($scope.goal)
        })
      }
//function for adding comments for the mentee goals
      $scope.addcomment=function(comment){
        console.log($rootScope.id)
        console.log($stateParams.goal_id)
        console.log($rootScope.type)
        console.log(comment)
        $http({
            url:$rootScope.url+"/myproject/add_mentee_goals_comment.php",
            method:"GET",
            params:{commentor_id:$rootScope.id,mentee_goal_id:$stateParams.goal_id,
            comment_by:$rootScope.type,comment_text:comment}
        })
        .then(function(response){
            console.log(response.data)
            $scope.getcomments();
        })

      }
      //function for getting tasks which are set by the mentor
      $scope.gettasks=function(){
        $http(
        {
          url: $rootScope.url+"/myproject/mentee-task.php",
          method:"GET",
          params:{mentor_id:$rootScope.mentor_id,id:$rootScope.id}
        })
        .then(function(response){
          $scope.menteetasks=response.data;
          console.log($scope.menteetasks)

        })
      }
      //function for the mentee to add schedule 
      $scope.addschedules=function(date1,stime,ftime,description,type){
        $scope.date1 = moment(date1).format('YYYY-MM-DD');
        $scope.stime1=moment(stime).format('HH:mm');
        $scope.ftime1=moment(ftime).format('HH:mm');
      $http(
        {
          url:$rootScope.url+"/myproject/meeting_schedule.php",
          method:"GET",
          params: {date: $scope.date1,start_time:$scope.stime1,end_time:$scope.ftime1,
            mentor_id:$rootScope.mentor_id,
            mentee_id:$rootScope.id,comment:description}
        }
      )
      .then(function(response){
        $scope.result=response.data;
        console.log($scope.result)
      })
      }
       //function for the mentee to get schedule 
      $scope.getschedules=function(){
      $scope.mentee_id=$stateParams.mentee_id;
      $http(
        {
          url:$rootScope.url+"/myproject/view_meeting_schedule.php",
          method:"GET",
          params:{mentor_id:$rootScope.mentor_id,mentee_id:$rootScope.id}
        })
        .then(function(response){$scope.schedules=response.data;console.log($scope.schedules)})
      }
       
})
