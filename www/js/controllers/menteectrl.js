angular.module('drsmith.controllers.menteectrl', [])
.controller('menteectrl',function($scope,$http,$rootScope,$stateParams,$state,$ionicModal){
    //function for getting mentee details in the mentee details page
        $scope.details=function(){
          var id=$stateParams.id;
          $scope.mentor_name=$rootScope.name;
          $http(
            {
                url:$rootScope.url+"/myproject/login_read.php",
                method:"GET",
                params:{id:$rootScope.id}
            })
          .then(function(response){
            $scope.mentees=response.data;
            for(var i=1;i<$scope.mentees.length+1;i++){
                if(id==i){
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
        $ionicModal.fromTemplateUrl('templates/add_mentee_tasks.html',{
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
    //function for getting schedules which are added by the mentee and mentor both    
   $scope.getschedules=function(){
          $scope.mentee_id=$stateParams.mentee_id;
          $http(
            {
              url:$rootScope.url+"/myproject/view_meeting_schedule.php",
              method:"GET",
              params:{mentor_id:$rootScope.id,mentee_id:$stateParams.mentee_id}
            })
            .then(function(response){$scope.schedules=response.data;console.log($scope.schedules)})
        }
    //function for the mentor to get the goals of mentee
      $scope.getmenteegoals=function(){
        $scope.mentee_id=$stateParams.mentee_id;
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
            console.log($scope.menteegoals)
          })
        };

      //function for mentor to get the tasks which are set by mentor
      $scope.gettasks=function(){
        $scope.mentee_id=$stateParams.mentee_id;
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
          console.log($scope.menteetasks)

        }
      )
    }
    //function for mentor to add task for the mentee with file

          // var base64=null;
          // var name=null;
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
            if($scope.taskObj.selected_img.length < 1 || $scope.taskObj.task_date==undefined)
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

         })
