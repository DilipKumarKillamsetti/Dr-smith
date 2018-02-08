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
        $scope.addschedules=function(date1,stime,ftime,mentee_id,description,type){
          console.log(date1); 
          console.log(stime); 
          console.log(ftime);
          console.log(mentee_id); 
          console.log(type)
          console.log($rootScope.id)
          console.log(description)
          $scope.date1 = moment(date1).format('YYYY-MM-DD');
          $scope.stime1=moment(stime).format('HH:mm');
          $scope.ftime1=moment(ftime).format('HH:mm');
          console.log( $scope.date1)
          console.log( $scope.stime1)
          console.log( $scope.ftime1)


          $http({
              url:$rootScope.url+"/myproject/meeting_schedule.php",
              method:"GET",
              params: {date:$scope.date1,start_time:$scope.stime1,end_time:$scope.ftime1,
                mentor_id:$rootScope.id,mentee_id:mentee_id,comment:description}
            })
          .then(function(response){
            $scope.result=response.data;
            console.log($scope.result)
          })
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
          var base64=null;
          var name=null;
          $scope.addtask=function(task,files,date1){
            console.log(task)
            console.log($rootScope.id)
            console.log(files)
            console.log($stateParams.mentee_id)
            var selectedfile = document.getElementById("inputFile").files;
            console.log(selectedfile)
            if(selectedfile.length < 1 && task==undefined)
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
                  $scope.fun(task,date1);   
              }
          }
          else
           {  $scope.fun(task,date1);}
          }
      //sub function for add task with file function
        $scope.fun=function(task,date1){
          console.log(task);
          console.log(name);
          $scope.formattedDate1 = moment(date1).format('YYYY-MM-DD');
        console.log( $scope.formattedDate1)
          $http(
            {
              url:$rootScope.url+"/myproject/add-mentee-task.php",
              method:"POST",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data:{mentor_id:$rootScope.id,id:$stateParams.mentee_id,task:task,name:name,shab:base64,
                due_date:$scope.formattedDate1}
        })
          .then(function(response){
          $scope.task=response;
          console.log($scope.task)
              $scope.gettasks(id);
              $scope.new_task=null;
            }
          )
          .catch(function(e){
            alert(e)
          })

          document.getElementById("task").value="";
              }

         })
