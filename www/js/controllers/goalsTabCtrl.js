angular.module('drsmith.controllers.goalsTabCtrl', [])
.controller('goalsctrl',function($scope,$rootScope,$http, $ionicModal)
{
  $ionicModal.fromTemplateUrl('templates/add_goal_mentor.html',{
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
  // console.log($rootScope.url)
  $scope.get=function(){
    // console.log($rootScope.id)
    $http(
    {
      url:$rootScope.url+"/myproject/mentor-goal1.php",
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
$scope.add=function(goal,files,date1){
  console.log(goal)
 
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

$scope.fun=function(goal,date1){
  console.log(goal);
  $scope.formattedDate = moment(date1).format('YYYY-MM-DD');
  console.log($scope.formattedDate)
  $http(
    {
      url:$rootScope.url+"/myproject/add_mentor_goal_with_file.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{id:$rootScope.id,name:name,goal:goal,shab:base64,due_date:$scope.formattedDate}
 })
  .then(function(response){
   $scope.goals=response;
  console.log($scope.goals)
      $scope.get();
      $scope.new_goal=null;
    }
  )
  .catch(function(e){
    alert(e)
  })
  document.getElementById("goal").value="";
      }
})