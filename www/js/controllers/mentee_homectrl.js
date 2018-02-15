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
      //modal for add task(Self) mentee_task page
      $ionicModal.fromTemplateUrl('templates/add_mentee_task.html',{
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal){
        $scope.add_task_modal=modal;
            });
      $scope.openModal_task = function()
       { 
         $scope.add_task_modal.show(); 
      };
       $scope.closeModal_task = function()
        {
        $scope.add_task_modal.hide();
        };
        //modal for edit task in mentee login
        $ionicModal.fromTemplateUrl('templates/EditingFeature_MenteeLogin/edit_task_mentee.html',{
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function(modal){
          $scope.edit_task_modal=modal;
              });
        $scope.openModal_task_edit = function(task_id)
         { 
           $scope.task_id=task_id;
           $scope.edit_task_modal.show(); 
        };
         $scope.closeModal_task_edit = function()
          {
            $scope.task_id="" 
          $scope.edit_task_modal.hide();
          };
          //modal for edit goal in mentee login
          $ionicModal.fromTemplateUrl('templates/EditingFeature_MenteeLogin/edit_goal_mentee.html',{
            scope: $scope,
            animation: 'slide-in-up'
          })
          .then(function(modal){
            $scope.edit_goal_modal=modal;
                });
          $scope.openModal_goal_edit = function(goal_id)
           { 
             $scope.goal_id=goal_id;
             $scope.edit_goal_modal.show(); 
          };
           $scope.closeModal_goal_edit = function()
            {
            $scope.edit_goal_modal.hide();
            };
            $scope.duration=function(now,then){
              var startTime=moment(now, "HH:mm");
              var endTime=moment(then, "HH:mm");
              var duration = moment.duration(endTime.diff(startTime));
              var hours = parseInt(duration.asHours());
              var minutes = parseInt(duration.asMinutes());
              return (minutes);
            }
            // $('#duration').click(function() {
            //   var now  = "04/09/2013 11:20:30";
            //   var then = "04/09/2013 14:20:30";
            //   $scope.duration=moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
            // });
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
            for(var i=0;i<$scope.goals.length;i++)
            {
              $scope.goals[i].edited_date=moment($scope.goals[i].edited_date).format('YYYY-MM-DD')
            }
            console.log($scope.goals)
      
          }
        )
      }
  // function for mentee to add the goals(self)
  $scope.goalsObj = {};
  $scope.goalsObj = {
    new_goal:'',
    goal_date:'',
    selected_img:'',
    selectedImgName:'',
    selected_img_base64:''
  };
  $scope.addgoal = function()
      {
        console.log($scope.goalsObj.new_goal, $scope.goalsObj.goal_date);
        $scope.goalsObj.selected_img = document.getElementById("inputFile").files;

        if($scope.goalsObj.selected_img.length < 1 && $scope.goalsObj.new_goal=="")
        {
          alert("selelct value");
        }
        else if($scope.goalsObj.selected_img.length > 0)
        {
          $scope.goalsObj.selectedImgName = $scope.goalsObj.selected_img[0].name;
          var filetoload = $scope.goalsObj.selected_img[0];
          var fileReader= new FileReader();
          fileReader.readAsDataURL(filetoload);

          fileReader.onload=function(fileLoadedEvent)
          {
            $scope.goalsObj.selected_img_base64 = fileLoadedEvent.target.result;
            $scope.fun();
          }
        }
        else
        {
          $scope.fun();
        }

      }
   /* $scope.addgoal=function(goal,files,date1){
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
    }*/
     //  sub function for the mentee to add goal with file   
     $scope.fun=function(){
      console.log($scope.goalsObj.new_goal, $scope.goalsObj.goal_date);
      $scope.formattedDate = moment($scope.goalsObj.goal_date).format('YYYY-MM-DD');
    
      console.log($scope.formattedDate)
      $http(
        {
          url:$rootScope.url+"/myproject/add_mentee_goal_with_file.php",
           method:"POST",
           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:{id:$rootScope.id,name:$scope.goalsObj.selectedImgName,
            goal:$scope.goalsObj.new_goal,shab:$scope.goalsObj.selected_img_base64,
            due_date:$scope.formattedDate,mentor_id:$rootScope.mentor_id}
     })
      .then(function(response){
       $scope.goals=response;
      console.log($scope.goals)
          $scope.getgoals();
          $scope.goalsObj = {};
          $scope.goalsObj = {
            new_goal:'',
            goal_date:'',
            selected_img:'',
            selectedImgName:'',
            selected_img_base64:''
          };
          document.getElementById("inputFile").value = null;
          $scope.formattedDate = '';
        }
      )
      .catch(function(e){
        alert(e)
      })
          }
   /* $scope.fun=function(goal,date1){
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
          }*/
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
    $scope.commentObj_goal={};
        $scope.commentObj_goal={
          comment:''
        }
      $scope.addcomment=function(){
        console.log($rootScope.id)
        console.log($stateParams.goal_id)
        console.log($rootScope.type)
        console.log($scope.commentObj_goal.comment)
        $http({
            url:$rootScope.url+"/myproject/add_mentee_goals_comment.php",
            method:"GET",
            params:{commentor_id:$rootScope.id,mentee_goal_id:$stateParams.goal_id,
            comment_by:$rootScope.type,comment_text:$scope.commentObj_goal.comment}
        })
        .then(function(response){
            console.log(response.data)
            $scope.commentObj_goal={
              comment:''
            }
            $scope.getcomments();
        })

      }
      //function for getting tasks which are set by the mentor and self
      $scope.gettasks=function(){
        $http(
        {
          url: $rootScope.url+"/myproject/mentee-task.php",
          method:"GET",
          params:{mentor_id:$rootScope.mentor_id,id:$rootScope.id}
        })
        .then(function(response){
          $scope.menteetasks=response.data;
          for(var i=0;i<$scope.menteetasks.length;i++)
            {
              $scope.menteetasks[i].edited_date=moment($scope.menteetasks[i].edited_date).format('YYYY-MM-DD')
            }
          console.log($scope.menteetasks)

        })
      }
      //function for adding tasks (Self)
      $scope.taskObj = {};
      $scope.taskObj = {
        new_task:'',
        task_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
      };
      $scope.addtask=function(){
        $scope.taskObj.selected_img=document.getElementById("inputFile").files;
        // var selectedfile = document.getElementById("inputFile").files;
        console.log($scope.taskObj.selected_img[0])
        if($scope.taskObj.selected_img.length < 1 && $scope.taskObj.task_date==undefined)
        {
        alert("selelct value");
        }
        else if( $scope.taskObj.selected_img.length>0 ){
            
          $scope.taskObj.selectedImgName = $scope.taskObj.selected_img[0].name;
          var filetoload=$scope.taskObj.selected_img[0];
          var fileReader= new FileReader();
          fileReader.readAsDataURL(filetoload);
          fileReader.onload=function(fileLoadedEvent){
            $scope.taskObj.selected_img_base64 =fileLoadedEvent.target.result;
              $scope.fun1();   
          }
      }
      else
       {  $scope.fun1();}
      }
  //sub function for add task with file function
    $scope.fun1=function(){
      $scope.formattedDate1 = moment($scope.taskObj.task_date).format('YYYY-MM-DD');
    console.log( $scope.formattedDate1)
      $http(
        {
          url:$rootScope.url+"/myproject/add-mentee-task.php",
          method:"POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:{mentor_id:$rootScope.mentor_id,id:$rootScope.id,task: $scope.taskObj.new_task,
            name: $scope.taskObj.selectedImgName,shab:$scope.taskObj.selected_img_base64,
            due_date:$scope.formattedDate1}
    })
      .then(function(response){
      $scope.task=response;
      console.log($scope.task)
      $scope.taskObj = {
        new_task:'',
        task_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
      };
      document.getElementById("inputFile").value=null;
      $scope.formattedDate1 ="";
          $scope.gettasks();
        }
      )
      .catch(function(e){
        alert(e)
      })

      document.getElementById("task").value="";
          }
      //function for the mentee to add schedule 
      $scope.scheduleObj={};
      $scope.scheduleObj={
        date:'',
        stime:'',
        ftime:'',
        type:'',
        description:''
      }
      $scope.addschedules=function(){
        $scope.date1 = moment($scope.scheduleObj.date).format('YYYY-MM-DD');
        $scope.stime1=moment($scope.scheduleObj.stime).format('HH:mm');
        $scope.ftime1=moment($scope.scheduleObj.ftime).format('HH:mm');
        if($scope.date1=="Invalid date"&&$scope.stime1=="Invalid date"&&$scope.ftime1=="Invalid date")
          {alert("select valid values") }
          else{
            $http({
          url:$rootScope.url+"/myproject/meeting_schedule.php",
          method:"GET",
          params: {date: $scope.date1,start_time:$scope.stime1,end_time:$scope.ftime1,
            mentor_id:$rootScope.mentor_id,mentee_id:$rootScope.id,
            meeting_type:$scope.scheduleObj.type,
            added_by:$rootScope.type,
            comment:$scope.scheduleObj.description}
        })
      .then(function(response){
        $scope.result=response.data;
        $scope.getschedules();
        console.log($scope.result)
        $scope.scheduleObj={
          date1:'',
          stime:'',
          ftime:'',
          type:'',
          description:''
        }
      })
    }
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
        .then(function(response){
          $scope.schedules=response.data;
          console.log($scope.schedules)
        })
      }

      //function for editing mentee tasks
      $scope.edit_mentee_taskObj={
        new_task:'',
        task_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
               }
      $scope.edit_mentee_task=function(menteetask_id){
        console.log($scope.edit_mentee_taskObj.new_task)
        console.log($scope.edit_mentee_taskObj.task_date);
      $scope.edit_mentee_taskObj.selected_img = document.getElementById("inputFile").files;
    
      if($scope.edit_mentee_taskObj.selected_img.length < 1 && $scope.edit_mentee_taskObj.new_task=="")
      {
        alert("selelct value");
      }
      else if($scope.edit_mentee_taskObj.selected_img.length > 0)
      {
        $scope.edit_mentee_taskObj.selectedImgName = $scope.edit_mentee_taskObj.selected_img[0].name;
        console.log($scope.edit_mentee_taskObj.selectedImgName)
        var filetoload = $scope.edit_mentee_taskObj.selected_img[0];
        var fileReader= new FileReader();
        fileReader.readAsDataURL(filetoload);
        fileReader.onload=function(fileLoadedEvent)
        {
          $scope.edit_mentee_taskObj.selected_img_base64 = fileLoadedEvent.target.result;
          $scope.fun2(menteetask_id);
        }
      }
      else
      {
        $scope.fun2(menteetask_id);
      }
      }
      $scope.fun2=function(menteetask_id){
        console.log($scope.edit_mentee_taskObj.new_task, $scope.edit_mentee_taskObj.task_date);
        if($scope.edit_mentee_taskObj.task_date!=""){
        $scope.menteeTask_DueDate = moment($scope.edit_mentee_taskObj.task_date).format('YYYY-MM-DD');
        console.log($scope.menteeTask_DueDate)
        }
        $http(
          {
            url:$rootScope.url+"/myproject/edit_mentee_task.php",
             method:"POST",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{editor_id:$rootScope.id,edited_by:$rootScope.type,
              name:$scope.edit_mentee_taskObj.selectedImgName,task:$scope.edit_mentee_taskObj.new_task,
              shab:$scope.edit_mentee_taskObj.selected_img_base64,
              task_id:menteetask_id,due_date:$scope.menteeTask_DueDate}
       })
        .then(function(response){
        console.log(response.data)
            $scope.gettasks();
            $scope.edit_mentee_taskObj = {};
            $scope.edit_mentee_taskObj = {
              new_task:'',
              task_date:'',
              selected_img:'',
              selectedImgName:'',
              selected_img_base64:''
            };
            document.getElementById("inputFile").value = null;
            $scope.menteeTask_DueDate = '';
          }
        )
        .catch(function(e){
          alert(e)
        })
      }

      //function for mentee goal edit in mentee login
      $scope.edit_mentee_goalObj={
        new_goal:'',
        goal_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
      }
      $scope.edit_mentee_goal=function(menteegoal_id){
        console.log($scope.edit_mentee_goalObj.new_goal)
        console.log($scope.edit_mentee_goalObj.goal_date);
      $scope.edit_mentee_goalObj.selected_img = document.getElementById("inputFile").files;
    
      if($scope.edit_mentee_goalObj.selected_img.length < 1 && $scope.edit_mentee_goalObj.new_goal=="")
      {
        alert("selelct value");
      }
      else if($scope.edit_mentee_goalObj.selected_img.length > 0)
      {
        $scope.edit_mentee_goalObj.selectedImgName = $scope.edit_mentee_goalObj.selected_img[0].name;
        console.log($scope.edit_mentee_goalObj.selectedImgName)
        var filetoload = $scope.edit_mentee_goalObj.selected_img[0];
        var fileReader= new FileReader();
        fileReader.readAsDataURL(filetoload);
        fileReader.onload=function(fileLoadedEvent)
        {
          $scope.edit_mentee_goalObj.selected_img_base64 = fileLoadedEvent.target.result;
          $scope.fun1(menteegoal_id);
        }
      }
      else
      {
        $scope.fun1(menteegoal_id);
      }
      }
      $scope.fun1=function(menteegoal_id){
        console.log($scope.edit_mentee_goalObj.new_goal, $scope.edit_mentee_goalObj.goal_date);
        if($scope.edit_mentee_goalObj.goal_date!=""){
        $scope.menteeGoal_DueDate = moment($scope.edit_mentee_goalObj.goal_date).format('YYYY-MM-DD');
        console.log($scope.menteeGoal_DueDate)
        }
        $http(
          {
            url:$rootScope.url+"/myproject/edit_mentee_goal_1.php",
             method:"POST",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{editor_id:$rootScope.id,edited_by:$rootScope.type,
              name:$scope.edit_mentee_goalObj.selectedImgName,goal:$scope.edit_mentee_goalObj.new_goal,
              shab:$scope.edit_mentee_goalObj.selected_img_base64,
              goal_id:menteegoal_id,due_date:$scope.menteeGoal_DueDate}
       })
        .then(function(response){
        console.log(response.data)
            $scope.getgoals();
            $scope.edit_mentee_goalObj = {};
            $scope.edit_mentee_goalObj = {
              new_goal:'',
              goal_date:'',
              selected_img:'',
              selectedImgName:'',
              selected_img_base64:''
            };
            document.getElementById("inputFile").value = null;
            $scope.menteeGoal_DueDate = '';
          }
        )
        .catch(function(e){
          alert(e)
        })
      }










       
})
