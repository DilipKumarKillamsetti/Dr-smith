angular.module('drsmith.controllers.menteectrl', [])
.controller('menteectrl',function($scope,$http,$timeout,$rootScope,$stateParams,$state,$ionicModal){
    //function for getting mentee details in the mentee details page
    console.clear()
    $scope.date = new Date();


    $scope.doRefresh=function(){
      console.log('Mentee Details refresh Begin async operation......');
      $timeout($scope.details(),1500)
    }
  
  
    $scope.Goals_Refresh=function(){
      console.log('Getting Mentee Goals.....Begin async operation......');
      $timeout($scope.getmenteegoals(),1500)
    }


    $scope.Interaction_Refresh=function(){

      console.log('Getting Mentee Interactions.....Begin async operation......');
      $timeout($scope.getschedules(),1500)
    }


    $scope.Tasks_Refresh=function(){
      console.log('Getting Mentee Tasks.....Begin async operation......');

      $timeout($scope.gettasks(),1500)
    }



    $scope.details=function(){
      $scope.mentee_id=$stateParams.id;
      $scope.mentor_name=localStorage.getItem('name');
      console.log($scope.mentee_id,$scope.mentor_name);
      $http({
        url:localStorage.getItem('url')+"/myproject/mentee_details.php",
        method:"GET",
        params:{id:$scope.mentee_id}
    })
    .then(function(response){
        $scope.mentee=response.data;
        console.log($scope.mentee)
        $http(
          {
            url:localStorage.getItem('url')+"/myproject/view_meeting_schedule.php",
            method:"GET",
            params:{mentor_id:localStorage.getItem('id'),mentee_id:$scope.mentee.row.id}
          })
          .then(function(response1){
            $scope.meetings=response1.data;
            console.log("no of meetings :"+$scope.meetings.length)
          })
          $scope.$broadcast('scroll.refreshComplete');
    })
    }


    /*    $scope.details=function(){
          $scope.mentee_id=$stateParams.id;
          $scope.mentor_name=localStorage.getItem('name');
          console.log($scope.mentee_id,$scope.mentor_name);
          $http(
            {
                url:localStorage.getItem('url')+"/myproject/login_read.php",
                method:"GET",
                params:{id:localStorage.getItem('id')}
            })
          .then(function(response){
            $scope.mentees=response.data;
            console.log($scope.mentees.length)
            for(var i=0;i<$scope.mentees.length;i++){
                if($scope.mentees[i].id==$scope.mentee_id){
                  $scope.mentee=$scope.mentees[i];
                  break;
                }
          }
          console.log($scope.mentee)
          $scope.$broadcast('scroll.refreshComplete');
        })
        }*/
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
           document.getElementById('sdate').onchange=function(){
             console.log($scope.scheduleObj.stime)
             $scope.mintime = new Date($scope.scheduleObj.stime)
             console.log($scope.mintime)
           }
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
          $scope.open_edit_modal_mentee_goals=function(menteegoal_id,goal_desc,goal_duedate)
          {
            goal_duedate = new Date(goal_duedate)
            console.log(goal_duedate)
            $scope.edit_mentee_goalObj.new_goal = goal_desc;
            $scope.edit_mentee_goalObj.goal_date = goal_duedate;
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
          $scope.open_edit_modal_mentee_tasks=function(menteetask_id,task_desc,task_duedate)
          {
            task_duedate = new Date(task_duedate)
            console.log(task_duedate)
            //task_duedate=moment(task_duedate).format("MM-DD-YYYY")
            console.log(task_desc)
            $scope.edit_mentee_taskObj.new_task=task_desc;
            $scope.edit_mentee_taskObj.task_date = task_duedate;
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
        $scope.addschedules=function(){
          var mentee_id = $stateParams.mentee_id
          $scope.date1 = moment($scope.scheduleObj.date1).format('YYYY-MM-DD');
          $scope.stime1=moment($scope.scheduleObj.stime).format('HH:mm');
          $scope.ftime1=moment($scope.scheduleObj.ftime).format('HH:mm');
          console.log($scope.scheduleObj.date1,"<->" , $scope.date1)
          console.log($scope.scheduleObj.stime,"<->" , $scope.stime1)
          console.log( $scope.scheduleObj.ftime ,"<->" ,$scope.ftime1)
          console.log( $scope.scheduleObj.description)
          console.log( $scope.scheduleObj.type)
          console.log("menteee Id :"+mentee_id)
          if($scope.scheduleObj.date1=="" || $scope.scheduleObj.stime=="" || $scope.scheduleObj.ftime=="" ||
           $scope.scheduleObj.description == "" || $scope.scheduleObj.type == "")
          {
            alert("select valid values")
           }
            else{
          $http({
              url:localStorage.getItem('url')+"/myproject/meeting_schedule.php",
              method:"GET",
              params: {date:$scope.date1 , start_time:$scope.stime1 , end_time:$scope.ftime1,
                added_by:localStorage.getItem('type') , meeting_type:$scope.scheduleObj.type,
                mentor_id:localStorage.getItem('id') , mentee_id:mentee_id , comment:$scope.scheduleObj.description}
            })
          .then(function(response){
            $scope.result=response.data;
            console.log($scope.result)
            $scope.getschedules(mentee_id);
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
          if(minutes<0){
            minutes = -minutes
          }
          return (minutes);
        }
    //function for getting schedules which are added by the mentee and mentor both 
    // $scope.inischedule=function()
    // {
    //   $scope.mentee_id =$stateParams.mentee_id;
    // }
    $scope.completeImg = "img/completion-icon.png";
 
   $scope.getschedules=function(){
    var mentee_id =$stateParams.mentee_id;
         console.log(  mentee_id )
          $http(
            {
              url:localStorage.getItem('url')+"/myproject/view_meeting_schedule.php",
              method:"GET",
              params:{mentor_id:localStorage.getItem('id'),mentee_id:mentee_id}
            })
            .then(function(response){
              $scope.schedules=response.data;
              console.log($scope.schedules)
              for(var i=0;i<$scope.schedules.length;i++)
              {
                $scope.schedules[i].date=moment($scope.schedules[i].date).format('YYYY-MM-DD')
              }
              $scope.$broadcast('scroll.refreshComplete');
            })
        }
    //function for the mentor to get the goals of mentee
      $scope.getmenteegoals=function(){
        console.log($stateParams.mentee_id)
        $scope.mentee_id=$stateParams.mentee_id
        $scope.mentee_name=$stateParams.mentee_name;
        $scope.mentee_address=$stateParams.mentee_address;
        $http(
          {
              url:localStorage.getItem('url')+"/myproject/mentee-goal.php",
              method:"GET",
              params:{id:$stateParams.mentee_id}
          })
          .then(function(response){
            $scope.menteegoals=response.data;
            for(var i=0;i<$scope.menteegoals.length;i++)
              {
                $scope.menteegoals[i].due_date=moment($scope.menteegoals[i].due_date).format('MMM-DD-YYYY')
                $scope.menteegoals[i].completed_date=moment($scope.menteegoals[i].completed_date).format('MMM-DD-YYYY')
                $scope.menteegoals[i].edited_date=moment($scope.menteegoals[i].edited_date).format('MMM-DD-YYYY')
              }
            console.log($scope.menteegoals)
            $scope.$broadcast('scroll.refreshComplete');
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
          
          console.log($scope.edit_mentee_goalObj.goal_date)
          if( $scope.edit_mentee_goalObj.goal_date != null)
        {
          $scope.edit_mentee_goalObj.goal_date = new Date($scope.edit_mentee_goalObj.goal_date)

          console.log($scope.edit_mentee_goalObj.goal_date)

        $scope.edit_mentee_goalObj.selected_img = document.getElementById("inputFile").files;
      
        
        if( isNaN($scope.edit_mentee_goalObj.goal_date) ||  $scope.edit_mentee_goalObj.new_goal=="")
        {
          alert("selelct value");
        }
        else 
        {
          if($scope.edit_mentee_goalObj.selected_img.length > 0){
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
      }
      else{
        alert("select values")
      }
        }
        $scope.fun1=function(menteegoal_id){
          console.log($scope.edit_mentee_goalObj.new_goal)
          console.log($scope.edit_mentee_goalObj.goal_date);
          if( $scope.edit_mentee_goalObj.goal_date )
          {
          $scope.menteeGoal_DueDate = moment($scope.edit_mentee_goalObj.goal_date).format('YYYY-MM-DD');
          console.log($scope.menteeGoal_DueDate)
          }
          var edited_date = new Date();
           edited_date = moment(edited_date).format('YYYY-MM-DD')
          $http(
            {
              url:localStorage.getItem('url')+"/myproject/edit_mentee_goal_1.php",
               method:"POST",
               headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data:{editor_id:localStorage.getItem('id'),edited_by:localStorage.getItem('type'),
                name:$scope.edit_mentee_goalObj.selectedImgName,
                goal:$scope.edit_mentee_goalObj.new_goal,
                shab:$scope.edit_mentee_goalObj.selected_img_base64,
                goal_id:menteegoal_id, due_date:$scope.menteeGoal_DueDate,
              edited_date:edited_date
            }
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
          url: localStorage.getItem('url')+"/myproject/mentee-task.php",
          method:"GET",
          params:{mentor_id:localStorage.getItem('id'),id:$stateParams.mentee_id}
        })
        .then(function(response){
          $scope.menteetasks=response.data;
          console.log($scope.menteetasks)
          for(var i=0;i<$scope.menteetasks.length;i++)
          {
            $scope.menteetasks[i].due_date=moment($scope.menteetasks[i].due_date).format('MMM-DD-YYYY')
            $scope.menteetasks[i].edited_date=moment($scope.menteetasks[i].edited_date).format('MMM-DD-YYYY')
            $scope.menteetasks[i].completed_date=moment($scope.menteetasks[i].completed_date).format('MMM-DD-YYYY')
          }
          console.log($scope.menteetasks)
          $scope.$broadcast('scroll.refreshComplete');

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
            console.log($stateParams.mentee_id,localStorage.getItem('id'))
            $scope.taskObj.selected_img=document.getElementById("inputFile").files;
            // var selectedfile = document.getElementById("inputFile").files;
            $scope.taskObj.task_date == new Date($scope.taskObj.task_date)
            console.log($scope.taskObj.selected_img[0])
            if(  isNaN($scope.taskObj.task_date) || $scope.taskObj.new_task =="" )
            {
            alert("select value");
            }
            else {
              if( $scope.taskObj.selected_img.length>0 ){
              $scope.taskObj.selectedImgName = $scope.taskObj.selected_img[0].name;
              var filetoload=$scope.taskObj.selected_img[0];
              var fileReader= new FileReader();
              fileReader.readAsDataURL(filetoload);
              fileReader.onload=function(fileLoadedEvent){
                $scope.taskObj.selected_img_base64 =fileLoadedEvent.target.result;
                  $scope.fun();   
              }
            }
              else { 
                alert("Hey Escaping....")
                 $scope.fun();
                }
           }
         
          }
      //sub function for add task with file function
        $scope.fun=function(){
          $scope.formattedDate1 = moment($scope.taskObj.task_date).format('YYYY-MM-DD');
        console.log( $scope.formattedDate1)
          $http(
            {
              url:localStorage.getItem('url')+"/myproject/add-mentee-task.php",
              method:"POST",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data:{mentor_id:localStorage.getItem('id'),id:$stateParams.mentee_id,task: $scope.taskObj.new_task,
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
              }
            /*  $scope.confirm=function(menteegoal_id){
                var a = confirm("Are you sure?")
                if(a)
                {
                  $scope.completed=true;
                  $scope.mentee_goal_update(menteegoal_id)
                }
                else{
                  console.log("hii.......")
                  $scope.completed=false;
                }
              }*/
          $scope.mentee_goal_update=function(goal_id){
            var currentDate  = new Date();
            currentDate=moment(currentDate).format('YYYY-MM-DD')
            console.log(goal_id,currentDate)
            $http({
              url:localStorage.getItem('url')+"/myproject/mentee_goal_completed.php",
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
              url:localStorage.getItem('url')+"/myproject/mentee_task_completed.php",
              method:"GET",
              params:{task_id:task_id,completed_date:currentDate}
            })
            .then(function(response){
              console.log(response.data)
              $scope.gettasks();
            })

          }
          $scope.interaction_update=function(interaction_id){
            console.log($stateParams.mentee_id)
            var currentDate  = new Date();
            currentDate=moment(currentDate).format('YYYY-MM-DD')
            console.log(interaction_id,currentDate)
            $http({
              url:localStorage.getItem('url')+"/myproject/meeting_schedule_completed.php",
              method:"GET",
              params:{interaction_id:interaction_id,completed_date:currentDate}
            })
            .then(function(response){
              console.log(response.data)
              $scope.getschedules()
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
                if($scope.edit_mentee_taskObj.task_date != null){
                $scope.edit_mentee_taskObj.task_date = new Date($scope.edit_mentee_taskObj.task_date)
              $scope.edit_mentee_taskObj.selected_img = document.getElementById("inputFile").files;
            
              if( isNaN($scope.edit_mentee_taskObj.task_date) || $scope.edit_mentee_taskObj.new_task==""  )
              {
                alert("select value");
              }
              else 
              {
                if($scope.edit_mentee_taskObj.selected_img.length > 0){
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
                {$scope.fun2(menteetask_id);}

              }
            }
            else{
              alert("select values")
            }
              }
              $scope.fun2=function(menteetask_id){
                console.log($scope.edit_mentee_taskObj.new_task, $scope.edit_mentee_taskObj.task_date);
                if($scope.edit_mentee_taskObj.task_date!="")
                {
                $scope.menteeTask_DueDate = moment($scope.edit_mentee_taskObj.task_date).format('YYYY-MM-DD');
                console.log($scope.menteeTask_DueDate)
                }
                var edited_date = new Date();
                edited_date = moment(edited_date).format('YYYY-MM-DD')
                $http(
                  {
                    url:localStorage.getItem('url')+"/myproject/edit_mentee_task.php",
                     method:"POST",
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data:{editor_id:localStorage.getItem('id'),edited_by:localStorage.getItem('type'),
                      name:$scope.edit_mentee_taskObj.selectedImgName,
                      task:$scope.edit_mentee_taskObj.new_task,
                      shab:$scope.edit_mentee_taskObj.selected_img_base64,
                      task_id:menteetask_id,
                      due_date:$scope.menteeTask_DueDate,
                    edited_date:edited_date
                  }
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
