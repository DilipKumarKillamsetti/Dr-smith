angular.module('drsmith.controllers.menteectrl', [])
.controller('menteectrl',function($scope,$http,$rootScope,$stateParams,$state,$ionicModal){
    var id=$stateParams.id;
        $scope.details=function(){
          $scope.mentor_name=$rootScope.name;
        $http(
          {
              url:$rootScope.url+"/myproject/login_read.php",
              method:"GET",
              params:{id:$rootScope.id}
          }
        )
        .then(function(response){
          $scope.mentees=response.data;
        for(var i=1;i<$scope.mentees.length+1;i++){
              if(id==i){
            $scope.mentee=$scope.mentees[i-1];
            //  $scope.gettasks(id)

            break;}
        }
        console.log($scope.mentee)

      })
    }
      $ionicModal.fromTemplateUrl('templates/add_meetings.html',{
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

  $scope.addschedules=function(date1,stime,ftime,mentee_id,description){
    console.log(date1); console.log(stime); console.log(ftime); console.log(mentee_id); console.log($rootScope.id)
    console.log(description)
    $scope.date1 = moment(date1).format('YYYY-MM-DD');
    $scope.stime=moment(stime).format('HH:mm')
    $scope.ftime=moment(ftime).format('HH:mm')
    console.log( $scope.stime)
    console.log( $scope.ftime)


    $http(
      {
        url:$rootScope.url+"/myproject/meeting_schedule.php",
        method:"GET",
        params: {date:$scope.date1,start_time:$scope.stime,end_time:$scope.ftime,
          mentor_id:$rootScope.id,mentee_id:mentee_id,comment:description}
      }
    )
    .then(function(response){
      $scope.result=response.data;
      console.log($scope.result)
    })
  }
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
          })};

  // console.log($rootScope.url)
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
{ 
  $scope.fun(task,date1);
}
}

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