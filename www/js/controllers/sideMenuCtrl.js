angular.module('drsmith.controllers.sideMenuCtrl', [])
.controller('sideMenuCtrl', function($scope,$rootScope,$state,$timeout,
  $ionicHistory,$http,$window,$ionicModal) {
  //console.clear()
  console.log("calling...");
  console.log(localStorage.getItem('hideTab'))
  $scope.logout=function(){
   $ionicHistory.clearHistory()
   $ionicHistory.clearCache();
    $window.localStorage.clear();

    $state.go("login")
  }


    $scope.reportObj={
      text:'',
    }
    $scope.report=function(){
    if( $scope.reportObj.text=="")
    {
      alert("selelct value");
    }
    else{
      $http(
        {
          url:localStorage.getItem('url')+"/myproject/phpmailer/phpmailer/index.php",
           method:"POST",
           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:{reported_by_id:localStorage.getItem('id'),reported_by_type:localStorage.getItem('type'),
          reason:$scope.reportObj.text,reported_by:localStorage.getItem('name'),
          reported_by_phone_no:localStorage.getItem('phoneno') }
     })
     .then(function(response){
      console.log(response.data)
      alert("Your report hasbeen sucessfully submitted")
      $scope.reportObj={

        text:'' 
      }
        })
        .catch(function(e){
          alert(e)
        })
    }
    }

  //function for loading resources
  $scope.load_resources=function(){
    console.log("Resources ......")
    $http(
      {
          url:localStorage.getItem('url')+"/myproject/resource.php",
          method:"GET",
          params:{id:localStorage.getItem('id'),type:localStorage.getItem('type')}
      })
    .then(function(response){
      $scope.files=response.data
      console.log(response.data)
   
  })
  }
  //function for profile display
  $scope.profile=function(){
    if(localStorage.getItem('type') == "mentor") {
      console.log("Mentor Profile......")
    }
    if(localStorage.getItem('type') == "mentee") {
      console.log("Mentee Profile......")
    }
    console.log(localStorage.getItem('phoneno'))
    $http(
      {
          url:localStorage.getItem('url')+"/myproject/myprofile.php",
          method:"GET",
          params:{phone_no:localStorage.getItem('phoneno')}
      })
    .then(function(response){
      $scope.details=response.data;
      console.log($scope.details)
  })
  }

$scope.editable=true;
$scope.edit_profile=function(){
  $scope.editable=false;
  console.log(".........edit.......profile", $scope.editable)
  var password = $window.document.getElementById('password');
  var hobbies = $window.document.getElementById('hobbies');
  var likes = $window.document.getElementById('likes');
  var dislikes = $window.document.getElementById('dislikes');
  var aboutme = $window.document.getElementById('aboutme');
  var intrests = $window.document.getElementById('interests');

  password.focus();
  hobbies.focus();
  likes.focus();
  dislikes.focus();
  aboutme.focus();
  intrests.focus();
}

$scope.update_profile=function(password,hobbies,likes,dislikes,intrests,aboutme){ 
  console.log(password,hobbies,likes,dislikes,intrests,aboutme);
  console.log(localStorage.getItem('phoneno'))
  $http(
    {
        url:localStorage.getItem('url')+"/myproject/edit_profile.php",
        method:"GET",
        params:{ phone_no:localStorage.getItem('phoneno') ,
          type:localStorage.getItem('type'), interests : intrests , likes : likes , hobbies : hobbies,
          dislikes:dislikes,password:password,about_me:aboutme}
    })
  .then(function(response){
    console.log(response.data)
})
$scope.editable=true;
}

  $scope.mymentor=function(){
    if(localStorage.getItem('type')=="mentee"){
      $http(
        {
            url:localStorage.getItem('url')+"/myproject/login_read.php",
            method:"GET",
            params:{id:localStorage.getItem('id')}
        })
      .then(function(response){
        $scope.files=response.data;
        console.log($scope.files)
    })
    }
  }
  //functon for mentor to list all the other mentors
  $scope.doRefresh=function() {
    console.log('Begin async operation......');
   $timeout( function() {
      //simulate async response
      $http( {
        url:localStorage.getItem('url')+"/myproject/mentor_list.php",
        method:"GET",
        params:{phone_no:localStorage.getItem('phoneno')}
    })
  .then(function(response){
    $scope.mentors=response.data;
    console.log(response.data)
    }) 

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
   
  }
  $scope.mentorslist=function(){
    console.log("Mentors List.....",localStorage.getItem('phoneno'))
    $http(
      {
          url:localStorage.getItem('url')+"/myproject/mentor_list.php",
          method:"GET",
          params:{phone_no:localStorage.getItem('phoneno')}
      })
    .then(function(response){
      $scope.mentors=response.data;
      console.log(response.data)
  }) 
  }
  $scope.type=localStorage.getItem('type')
  $scope.$on("$ionicView.beforeLeave", function()
  {
    if(localStorage.getItem('type')=="mentor")
    {
      console.log($state.current.name)
      if($state.current.name == "app.home" || $state.current.name == "app.goals" || $state.current.name == "app.mentorforum" )
      {
        
        
        $rootScope.hideTab=false
      }
      else
      {
        $rootScope.hideTab=true
      }
    }
  })
  
  })