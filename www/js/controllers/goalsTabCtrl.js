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
  //modal for adding goals of mentor
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
  $ionicModal.fromTemplateUrl('templates/edit_goal_mentor.html',{
    scope : $scope,
    animation : 'slide-in-up'
  })
  .then(function(modal){
    $scope.edit_modal=modal;
  });
$scope.open_edit_modal=function(goal_id)
{
  $scope.goal_id=goal_id;
  $scope.edit_modal.show();
}
$scope.close_edit_modal=function()
{
  $scope.goal_id=null;
  $scope.edit_modal.hide();
}
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
      for(var i=0;i<$scope.goals.length;i++){
        $scope.goals[i].edited_date=moment($scope.goals[i].edited_date).format('YYYY-MM-DD')
      }
       console.log($scope.goals)

    }
  )
}
//function for adding mentor goals with file
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
      $scope.edit_goalObj={
        new_goal:'',
        goal_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
      }
  $scope.edit=function(goal_id){
    console.log($scope.edit_goalObj.new_goal)
    console.log($scope.edit_goalObj.goal_date);
  $scope.edit_goalObj.selected_img = document.getElementById("inputFile").files;

  if($scope.edit_goalObj.selected_img.length < 1 && $scope.edit_goalObj.new_goal=="")
  {
    alert("selelct value");
  }
  else if($scope.edit_goalObj.selected_img.length > 0)
  {
    $scope.edit_goalObj.selectedImgName = $scope.edit_goalObj.selected_img[0].name;
    console.log($scope.edit_goalObj.selectedImgName)
    var filetoload = $scope.edit_goalObj.selected_img[0];
    var fileReader= new FileReader();
    fileReader.readAsDataURL(filetoload);
    fileReader.onload=function(fileLoadedEvent)
    {
      $scope.edit_goalObj.selected_img_base64 = fileLoadedEvent.target.result;
      $scope.fun1(goal_id);
    }
  }
  else
  {
    $scope.fun1(goal_id);
  }
  }
$scope.fun1=function(goal_id){
  console.log($scope.edit_goalObj.new_goal, $scope.edit_goalObj.goal_date);
  if($scope.edit_goalObj.goal_date!=""){
  $scope.formattedDate1 = moment($scope.edit_goalObj.goal_date).format('YYYY-MM-DD');
  console.log($scope.formattedDate1)
  }
  $http(
    {
      url:$rootScope.url+"/myproject/edit_mentor_goal.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{mentor_id:$rootScope.id,name:$scope.edit_goalObj.selectedImgName,goal:$scope.edit_goalObj.new_goal,
        shab:$scope.edit_goalObj.selected_img_base64,goal_id:goal_id}
 })
  .then(function(response){
   $scope.goals=response.data;
  console.log($scope.goals)
      $scope.get();
      $scope.edit_goalObj = {};
      $scope.edit_goalObj = {
        new_goal:'',
        goal_date:'',
        selected_img:'',
        selectedImgName:'',
        selected_img_base64:''
      };
      document.getElementById("inputFile").value = null;
      $scope.formattedDate1 = '';
    }
  )
  .catch(function(e){
    alert(e)
  })
}
// $scope.edit=function(goal_id){
//   console.log(goal_id,$scope.edit_goalObj.new_goal)
//   $http(
//     {
//       url:$rootScope.url+"/myproject/edit_mentor_goal.php",
//       method:"GET",
//       params:{mentor_id:$rootScope.id,goal:$scope.edit_goalObj.new_goal,goal_id:goal_id}
//     }
//   )
//  .then(function(response){
//   $scope.result=response.data;
//   console.log($scope.result);
  
//   $scope.get();
//     $scope.edit_goalObj = {
//       new_goal:'',
//       goal_date:'',
//       selected_img:'',
//       selectedImgName:'',
//       selected_img_base64:''
//     };
//  })
// }

})