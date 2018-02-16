angular.module('drsmith.controllers.menteectrl', [])
.controller('menteectrl',function($scope,$http,$rootScope,$stateParams,$state,$ionicModal){
    //function for getting mentee details in the mentee details page
   
        $scope.details=function(){
          $scope.mentee_id=$stateParams.id;
          $scope.mentor_name=$rootScope.name;
          console.log($scope.mentee_id)
          $http(
            {
                url:$rootScope.url+"/myproject/login_read.php",
                method:"GET",
                params:{id:$rootScope.id}
            })
          .then(function(response){
            $scope.mentees=response.data;
            for(var i=1;i<$scope.mentees.length+1;i++){
                if($scope.mentee_id==i){
                  $scope.mentee=$scope.mentees[i-1];
                  break;
                }
          }
          console.log($scope.mentee)
        })
      }
      //modal for the adding meeting on the mentee details page
      $ionicModal.fromTemplateUrl('templates/add_meetings.html',{
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal){
        $scope.meeting_modal=modal;
            });
      $scope.openModal = function()
       { 
         $scope.meeting_modal.show(); 
      };
       $scope.closeModal = function()
        {
        $scope.meeting_modal.hide();
        };
        //modal for the adding meeting on the interactions page
        $ionicModal.fromTemplateUrl('templates/add_meetings_inside_interactions.html',{
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function(modal){
          $scope.modal=modal;
              });
        $scope.openModal_interactions = function()
         { 
           $scope.modal.show(); 
        };
         $scope.closeModal_interactions = function()
          {
          $scope.modal.hide();
          };
           //modal for the adding tasks for the mentee
        $ionicModal.fromTemplateUrl('templates/add_tasks.html',{
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function(modal1){
          $scope.modal1=modal1;
              });
        $scope.opentaskModel = function()
         { 
           $scope.modal1.show(); 
        };
         $scope.closetaskModal = function()
          {
          $scope.modal1.hide();
          };
          //modal for editing menteee goals 
          $ionicModal.fromTemplateUrl('templates/EditingFeature_MentorLogin/edit_goal_mentee.html',{
            scope : $scope,
            animation : 'slide-in-up'
          })
          .then(function(modal){
            $scope.edit_modal_mentee_goals=modal;
          });
          $scope.open_edit_modal_mentee_goals=function(menteegoal_id)
          {
            $scope.menteegoal_id=menteegoal_id;
            $scope.edit_modal_mentee_goals.show();
          }
          $scope.close_edit_modal_mentee_goals=function()
          {
            $scope.menteegoal_id=null;
            $scope.edit_modal_mentee_goals.hide();
          }
          //modal for editing mentee tasks
          $ionicModal.fromTemplateUrl('templates/EditingFeature_MentorLogin/edit_task_mentee.html',{
            scope : $scope,
            animation : 'slide-in-up'
          })
          .then(function(modal){
            $scope.edit_modal_mentee_tasks=modal;
          });
          $scope.open_edit_modal_mentee_tasks=function(menteetask_id)
          {
            $scope.menteetask_id=menteetask_id;
            $scope.edit_modal_mentee_tasks.show();
          }
          $scope.close_edit_modal_mentee_tasks=function()
          {
            $scope.menteetask_id=null;
            $scope.edit_modal_mentee_tasks.hide();
          }

          


      //function for adding schedules/meetings with mentee    
      $scope.scheduleObj={};
      $scope.scheduleObj={
        date1:'',
        stime:'',
        ftime:'',
        type:'',
        description:''
      }
        $scope.addschedules=function(mentee_id){
          $scope.date1 = moment($scope.scheduleObj.date1).format('YYYY-MM-DD');
          $scope.stime1=moment($scope.scheduleObj.stime).format('HH:mm');
          $scope.ftime1=moment($scope.scheduleObj.ftime).format('HH:mm');
          console.log( $scope.date1)
          console.log( $scope.stime1)
          console.log( $scope.ftime1)
          if($scope.date1=="Invalid date"&&$scope.stime1=="Invalid date"&&$scope.ftime1=="Invalid date")
          {
            alert("select valid values")
            }
            else{
          $http({
              url:$rootScope.url+"/myproject/meeting_schedule.php",
              method:"GET",
              params: {date:$scope.date1,start_time:$scope.stime1,end_time:$scope.ftime1,
                added_by:$rootScope.type, meeting_type:$scope.scheduleObj.type,
                mentor_id:$rootScope.id,mentee_id:mentee_id,comment:$scope.scheduleObj.description}
            })
          .then(function(response){
            $scope.result=response.data;
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
        $scope.duration=function(now,then){
          var startTime=moment(now, "HH:mm");
          var endTime=moment(then, "HH:mm");
          var duration = moment.duration(endTime.diff(startTime));
          var hours = parseInt(duration.asHours());
          var minutes = parseInt(duration.asMinutes());
          return (minutes);
        }
    //function for getting schedules which are added by the mentee and mentor both 
    $scope.inischedule=function()
    {
      $scope.mentee_id =$stateParams.mentee_id;
    }
    $scope.completeImg = "img/completion-icon.png";
    // $scope.changeCompleteImg = function(taskId)
    // {
    //   console.log( $scope.menteetasks);
    //   if($scope.completeImg == "img/completion-icon.png")
    //   {
    //     $scope.completeImg = "img/incomplete-icon.png";
    //   }
    //   else
    //   {
    //     $scope.completeImg = "img/completion-icon.png";
    //   }
    // }
    
   $scope.getschedules=function(mentee_id){
         
          $http(
            {
              url:$rootScope.url+"/myproject/view_meeting_schedule.php",
              method:"GET",
              params:{mentor_id:$rootScope.id,mentee_id:$scope.mentee_id}
            })
            .then(function(response){
              $scope.schedules=response.data;console.log($scope.schedules)
              for(var i=0;i<$scope.schedules.length;i++)
              {
                $scope.schedules[i].date=moment($scope.schedules[i].date).format('YYYY-MM-DD')
              }
            })
        }
    //function for the mentor to get the goals of mentee
      $scope.getmenteegoals=function(){
        console.log($stateParams.mentee_id)
        $scope.mentee_name=$stateParams.mentee_name;
        $scope.mentee_address=$stateParams.mentee_address;
        $http(
          {
              url:$rootScope.url+"/myproject/mentee-goal.php",
              method:"GET",
              params:{id:$stateParams.mentee_id}
          })
          .then(function(response){
            $scope.menteegoals=response.data;
            for(var i=0;i<$scope.menteegoals.length;i++)
              {
                $scope.menteegoals[i].edited_date=moment($scope.menteegoals[i].edited_date).format('YYYY-MM-DD')
              }
            console.log($scope.menteegoals)
          })
        };
        //function for editing mentee goals (In mentor login)
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
              $scope.getmenteegoals();
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


      //function for mentor to get the tasks which are set by mentor
      $scope.gettasks=function(){
        console.log($stateParams.mentee_id)
        $scope.mentee_name=$stateParams.mentee_name;
        $scope.mentee_address=$stateParams.mentee_address;
        console.log($stateParams.mentee_id)
        $http(
        {
          url: $rootScope.url+"/myproject/mentee-task.php",
          method:"GET",
          params:{mentor_id:$rootScope.id,id:$stateParams.mentee_id}
        })
        .then(function(response){
          $scope.menteetasks=response.data;
          for(var i=0;i<$scope.menteetasks.length;i++)
          {
            $scope.menteetasks[i].edited_date=moment($scope.menteetasks[i].edited_date).format('YYYY-MM-DD')
            $scope.menteetasks[i].completed_date=moment($scope.menteetasks[i].completed_date).format('YYYY-MM-DD')
          }
          console.log($scope.menteetasks)

        }
      )
    }
    //function for mentor to add task for the mentee with file
          $scope.taskObj = {};
          $scope.taskObj = {
            new_task:'',
            task_date:'',
            selected_img:'',
            selectedImgName:'',
            selected_img_base64:''
          };
          $scope.addtask=function(){
            console.log($stateParams.mentee_id,$rootScope.id)
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
                  $scope.fun();   
              }
          }
          else
           {  $scope.fun();}
          }
      //sub function for add task with file function
        $scope.fun=function(){
          $scope.formattedDate1 = moment($scope.taskObj.task_date).format('YYYY-MM-DD');
        console.log( $scope.formattedDate1)
          $http(
            {
              url:$rootScope.url+"/myproject/add-mentee-task.php",
              method:"POST",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data:{mentor_id:$rootScope.id,id:$stateParams.mentee_id,task: $scope.taskObj.new_task,
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
          $scope.mentee_goal_update=function(goal_id){
            var currentDate  = new Date();
            currentDate=moment(currentDate).format('YYYY-MM-DD')
            console.log(goal_id,currentDate)
            $http({
              url:$rootScope.url+"/myproject/mentee_goal_completed.php",
              method:"GET",
              params:{goal_id:goal_id,completed_date:currentDate}
            })
            .then(function(response){
              console.log(response.data)
              $scope.getmenteegoals();
            })

          }
          $scope.mentee_task_update=function(task_id){
            var currentDate  = new Date();
            currentDate=moment(currentDate).format('YYYY-MM-DD')
            console.log(task_id,currentDate)
            $http({
              url:$rootScope.url+"/myproject/mentee_task_completed.php",
              method:"GET",
              params:{task_id:task_id,completed_date:currentDate}
            })
            .then(function(response){
              console.log(response.data)
              $scope.gettasks();
            })

          }
          $scope.interaction_update=function(interaction_id){
            console.log($scope.mentee_id)
            var currentDate  = new Date();
            currentDate=moment(currentDate).format('YYYY-MM-DD')
            console.log(interaction_id,currentDate)
            $http({
              url:$rootScope.url+"/myproject/meeting_schedule_completed.php",
              method:"GET",
              params:{interaction_id:interaction_id,completed_date:currentDate}
            })
            .then(function(response){
              console.log(response.data)
              $scope.getschedules($scope.mentee_id)
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



         })
