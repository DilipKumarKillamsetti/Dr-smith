angular.module('drsmith.controllers.goalsTabCtrl', [])
.controller('goalsctrl',function($scope,$rootScope,$http, $ionicModal)
{
  $scope.goalsObj = {};
  $scope.goalsObj = {
    new_goal:'',
    goal_date:'',
    selected_img:'',
    selectedImgName:'',
    selected_img_base64:''
  };
  
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

$scope.add = function()
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

/*var base64=null;
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
      selectedfile="";
    }
}
else
{ 
  $scope.fun(goal,date1);
}
}*/

$scope.fun=function(){
  console.log($scope.goalsObj.new_goal, $scope.goalsObj.goal_date);
  $scope.formattedDate = moment($scope.goalsObj.goal_date).format('YYYY-MM-DD');

  console.log($scope.formattedDate)
  $http(
    {
      url:$rootScope.url+"/myproject/add_mentor_goal_with_file.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{id:$rootScope.id,name:$scope.goalsObj.selectedImgName,goal:$scope.goalsObj.new_goal,shab:$scope.goalsObj.selected_img_base64,due_date:$scope.formattedDate}
 })
  .then(function(response){
   $scope.goals=response;
  console.log($scope.goals)
      $scope.get();
      /*document.getElementById("inputFile").value="";
      $scope.new_goal = "";
      goal="";
      date1="";
      base64="";
      $scope.formattedDate="";
      document.getElementById("date").value="";*/
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
  //document.getElementById("goal").value="";
      }
})