angular.module('drsmith.controllers.goalsTabCtrl', [])
.controller('goalsctrl',function($scope,$rootScope,$http,$window ,$timeout, $ionicModal)
{
  console.clear()
  $scope.date = new Date();
  $scope.doRefresh=function(){
    console.log('Begin async operation......');
    $timeout($scope.get(),1500)
  }

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
$scope.open_edit_modal=function(goal_id,due_date,goal_desc)
{
  console.log(due_date)
  due_date = new Date(due_date);
  console.log(due_date)
  $scope.edit_goalObj.new_goal = goal_desc;
  $scope.edit_goalObj.goal_date = due_date;
  $scope.goal_id=goal_id;
  $scope.edit_modal.show();
}
$scope.close_edit_modal=function()
{
  $scope.goal_id=null;
  $scope.edit_modal.hide();
}
//function for completed date submission for mentor_goals

$scope.confirm_=function(goal_id)
{
 var a= confirm("Are you sure to complete goal ?")
  console.log(a, "...confirmm....")
  if(a)
  {
    $scope.completed=true;
    $scope.update(goal_id);
  }
  else{
    $scope.completed=false;
  }
}
$scope.update=function(goal_id)
{
  var currentDate  = new Date();
  currentDate=moment(currentDate).format('YYYY-MM-DD')
  console.log(goal_id,currentDate)
  $http({
    url:localStorage.getItem('url')+"/myproject/mentor_goal_completed.php",
    method:"GET",
    params:{goal_id:goal_id,completed_date:currentDate}
  })
  .then(function(response){
    console.log(response.data)
    $scope.get();
  })
}
$scope.hidepage=true;
  $scope.get=function(){
    // console.log(localStorage.getItem('id'))
    $http(
    {
      url:localStorage.getItem('url')+"/myproject/mentor-goal1.php",
      method:"GET",
      params:{id:localStorage.getItem('id')}
    })
    .then(function(response){
      $scope.goals=response.data;
      for(var i=0;i<$scope.goals.length;i++){
        $scope.goals[i].due_date = moment($scope.goals[i].due_date).format('MMM-DD-YYYY')
        $scope.goals[i].edited_date=moment($scope.goals[i].edited_date).format('DD-MM-YYYY ')
        $scope.goals[i].completed_date=moment($scope.goals[i].completed_date).format('DD-MM-YYYY')
        $scope.$broadcast('scroll.refreshComplete');
      }
       console.log($scope.goals)
       $scope.hidepage=false;

    }
  )
}
//function for adding mentor goals with file
$scope.goalsObj = {};
$scope.goalsObj = {
  new_goal:'',
  goal_date:'',
  selected_img:'',
  selectedImgName:'',
  selected_img_base64:''
};
$scope.add = function()
{
  console.log($scope.goalsObj.new_goal, $scope.goalsObj.goal_date);
  $scope.goalsObj.selected_img = document.getElementById("inputFile").files;

  if($scope.goalsObj.goal_date =="" || $scope.goalsObj.new_goal=="")
  {
    alert("selelct value");
  }
  else 
  {
    if($scope.goalsObj.selected_img.length > 0){
    $scope.goalsObj.selectedImgName = $scope.goalsObj.selected_img[0].name;
    var filetoload = $scope.goalsObj.selected_img[0];
    var fileReader= new FileReader();
    fileReader.readAsDataURL(filetoload);

    fileReader.onload=function(fileLoadedEvent){
      $scope.goalsObj.selected_img_base64 = fileLoadedEvent.target.result;
      $scope.fun();
    }
  }
    else{
      $scope.fun();
    }
  }

}

$scope.fun=function(){
  console.log($scope.goalsObj.new_goal, $scope.goalsObj.goal_date);
  $scope.formattedDate = moment($scope.goalsObj.goal_date).format('YYYY-MM-DD');

  console.log($scope.formattedDate)
  $http(
    {
      url:localStorage.getItem('url')+"/myproject/add_mentor_goal_with_file.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{id:localStorage.getItem('id'),name:$scope.goalsObj.selectedImgName,goal:$scope.goalsObj.new_goal,shab:$scope.goalsObj.selected_img_base64,due_date:$scope.formattedDate}
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
      $scope.delete=function(goal_id)
      {
          confirm("Are You Sure To Delete");
          $http({
            url:localStorage.getItem('url')+"/myproject/add_mentor_goal_with_file.php",
            method:GET,
            params:{id:goal_id}
          })
          .then(function(response){
            console.log(response)
          })

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
  var edited_date = new Date();
   edited_date = moment(edited_date).format('YYYY-MM-DD')
  $http(
    {
      url:localStorage.getItem('url')+"/myproject/edit_mentor_goal.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{
        mentor_id:localStorage.getItem('id'),
        name:$scope.edit_goalObj.selectedImgName,
        goal:$scope.edit_goalObj.new_goal,
        shab:$scope.edit_goalObj.selected_img_base64,
        goal_id:goal_id , 
        due_date : $scope.formattedDate1 ,
        edited_date : edited_date}
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
//       url:localStorage.getItem('url')+"/myproject/edit_mentor_goal.php",
//       method:"GET",
//       params:{mentor_id:localStorage.getItem('id'),goal:$scope.edit_goalObj.new_goal,goal_id:goal_id}
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