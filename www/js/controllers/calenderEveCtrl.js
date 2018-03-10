angular.module('drsmith.controllers.calenderEveCtrl', ['ui.calendar','ionic'])
.controller("calenderEveCtrl",function($scope,$state,$stateParams,$http,$compile,
    uiCalendarConfig,$rootScope,$sce, $ionicPopup, $timeout){
    console.clear()
    $scope.showConfirm = function(date) {
        var confirmPopup = $ionicPopup.confirm({
          title: date.title,
          template: date.start._i
        });
     
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      }
    $scope.doRefresh=function(){
        console.log('Begin async operation......');
        var date = new Date();      
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
            $scope.eventSources = [
                [{ 
                        title:"Long Event",
                    start: new Date(y, m, d,19,00),
                    end: new Date(y, m, d,19,30)
                        }]
                ];
        $timeout($scope.get(),2000)
      }
    $scope.uiConfig = {
        calendar:{
          height: 'auto',
          editable: false,
          header:{
            left: "",
            center: 'title',
            right: 'today prev,next'
          },
          eventClick:function( date, jsEvent, view){
            console.log(date.title)
            console.log(date.start)
            console.log(date._start)
            $scope.showConfirm(date)
        },
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
          $scope.eventSources = [
              [{ 
                  title:"Long Event",
                  start: new Date(y, m, d,19,00),
                  end: new Date(y, m, d,19,30)
               }]
              ];
             console.log($scope.eventSources)
             console.log(localStorage.getItem('phoneno'))
            $scope.get=function() {
                 if(localStorage.getItem('type')=='mentee')  { 
                $http(
                    {
                    url: localStorage.getItem('url')+"/myproject/mentee_calendar_event.php",
                    method:"GET",
                    params:{phone_no: localStorage.getItem('phoneno')}
                    })
                    .then(function(response){
                    console.log(response.data)
                    $scope.events=response.data;    
                    $scope.goals =  $scope.events.mentee_goals;
                    console.log( $scope.goals)
                    $scope.meetings = $scope.events.meeting_schedule;
                    $scope.tasks_exists=true;
                    $scope.tasks = $scope.events.mentee_tasks;
                    $scope.webinars=$scope.events.webinars;
                    console.log($scope.webinars)
                    $scope.fun();
                    })
                }
                else
                { 
                    $http( {
                    url: localStorage.getItem('url')+"/myproject/mentor_calendar_event.php",
                    method:"GET",
                    params:{phone_no: localStorage.getItem('phoneno')}
                    })
                    .then(function(response){
                        console.log(response.data)
                        $scope.events=response.data;    
                        $scope.goals =  $scope.events.mentor_goals;
                        $scope.meetings = $scope.events.meeting_schedule;
                        $scope.tasks_exists=false;
                        $scope.webinars=$scope.events.webinar;
                        console.log( $scope.webinars)
                        $scope.fun();
                    })
                }
            }
        $scope.fun=function() {
           for (var i=0;i<$scope.goals.length;i++)
        {
            console.log($scope.goals[i].due_date)
            var date = new Date($scope.goals[i].due_date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
           $scope.addEvent("Goal Due Date",y,m,d)
        }
        for (var i=0;i<$scope.meetings.length;i++)
        {
            var date = new Date($scope.meetings[i].date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var start_time = $scope.meetings[i].start_time;
            var arr = start_time.split(':');
            var sth = parseInt(arr[0]) ;
            var stm = parseInt(arr[1]) ;
            var sts = parseInt(arr[2]) + " seconds";
            var end_time = $scope.meetings[i].end_time;
            var arr = end_time.split(':');
            var eth = parseInt(arr[0]) ;
            var etm = parseInt(arr[1]) ;
            var ets = parseInt(arr[2]) + " seconds";
            $scope.addEvent1("meeting",y,m,d,sth,stm,eth,etm)
        }
        if($scope.tasks_exists){
        for (var i=0;i<$scope.tasks.length;i++)
        {
            var date = new Date($scope.tasks[i].due_date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            $scope.addEvent("Task Due Date",y,m,d)
        }
        for(var i=0;i<$scope.webinars.length;i++){
                
            var date = new Date($scope.webinars[i].datetime);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var hr=date.getHours();
            var min=date.getMinutes();
            $scope.addWebinar("webinar",y,m,d,hr,min)
            }
     }
     else{
        for(var i=0;i<$scope.webinars.length;i++){
                
            var date = new Date($scope.webinars[i].datetime);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var hr=date.getHours();
            var min=date.getMinutes();
            $scope.addWebinar("webinar",y,m,d,hr,min)
            }
     }
        console.log($scope.eventSources)
        $scope.hidepage = false;
         $scope.$broadcast('scroll.refreshComplete');
    }
   
      $scope.addEvent1 = function(title,y,m,d,sth,stm,fth,ftm) {
        console.log(title,y,m+1,d,sth,stm,fth,ftm)
        var temp ={
          title :title,
          start: new Date(y, m, d, sth, stm),
          end: new Date(y, m, d, fth, ftm),
          allDay :false
      }
      var arr =[temp];
      $scope.eventSources.push(arr)
    };
    $scope.addEvent = function(title,y,m,d) {
        console.log(title,y,m+1,d)
      var temp ={
          title :title,
          start: new Date(y, m, d),
          end: new Date(y, m, d),
          allDay :true 
        }
      var arr =[temp];
     $scope.eventSources.push(arr)
    };
    $scope.addWebinar=function(title,y,m,d,hr,min){
        var temp={
            title:title,
            start : new Date(y,m,d,hr,min),
            allDay : false
        }
        var arr=[temp];
        $scope.eventSources.push(arr)
    }
    $scope.joinWebinar=function(id,password){
        $http( {
            url: localStorage.getItem('url')+"/myproject/menteejoin.php",
            method:"GET",
            params:{meetingId:id,attendeePw:password,username:$rootScope.name}
            })
            .then(function(response){
               // alert(response.data.status)
                if(response.data.status=="true"){
                    $scope.join_link=response.data.link;
                var confirmPopup = $ionicPopup.confirm({
                    title: "Join Webinar",
                    template: "Press ok to join Webinar"
                  });
               
                  confirmPopup.then(function(res) {
                    if(res) {
                    //  $state.go('app.iframe', {url : "http://anhance.org/demo/demoHTML5.jsp"})
                    //  window.open ($scope.join_link , '_blank');
                    window.open("http://anhance.org/demo/demoHTML5.jsp", '_system', 'location=no,clearsessioncache=no,clearcache=no','_blank');
                      console.log('You are sure');
                    } else {
                      console.log('You are not sure');
                    }
                  })
                }
                else{
                    var errorPopup = $ionicPopup.confirm({        
                        title: "Error",
                        template: "Webinar not yet started"
                      });
                }
            })

    }
    $scope.loadWebinar=function(){
        $scope.url=$stateParams.url;
        $scope.iframe_url=$sce.trustAsResourceUrl($scope.url)
        console.log( $sce.valueOf($scope.iframe_url) );
        console.log($scope.iframe_url)
    }
    $scope.startWebinar=function(id,meetingName,attendeePassword,Moderatorpwd){
        
        $http( {
            url: localStorage.getItem('url')+"/myproject/moderatorjoin.php",
            method:"GET",
            params:{meetingId:id,meetingName:meetingName,attendeePw:attendeePassword,
                moderatorPw:Moderatorpwd,username:$rootScope.name},
            })
            .then(function(response){
                console.log(response.data)
                if(response.data.status=="true"){
                    $scope.link=response.data.link;
                var confirmPopup = $ionicPopup.confirm({        
                    title: "Start Webinar",
                    template: "Press ok to Start Webinar",
                  });
                  confirmPopup.then(function(res) {
                    if(res) {
                       // $state.go('app.iframe', {url : "http://anhance.org/demo/demoHTML5.jsp"})
                      // window.open ($scope.link , '_blank');
                      window.open("http://anhance.org/demo/demoHTML5.jsp", '_system', 'location=no,clearsessioncache=no,clearcache=no','_blank');
                      console.log("opened Sucessfully")
                    } else {
                      console.log('You are not sure');
                    }
                  })
                }
                else{
                    var errorPopup = $ionicPopup.confirm({        
                        title: "Error",
                        template: "Webinar not yet started"
                      });
                }
            })
          }
})
