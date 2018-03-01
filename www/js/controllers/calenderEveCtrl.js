
angular.module('drsmith.controllers.calenderEveCtrl', ['ui.calendar','ionic', 'ui.bootstrap'])
.controller("calenderEveCtrl",function($scope,$http,$compile,uiCalendarConfig,$ionicPopup,$rootScope,$timeout){
    console.clear()
    $scope.count =0;
    $scope.hidepage = true;
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
      $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    $scope.showConfirm = function(title,start,end) {
        start=moment(start).format('LT');
        end=moment(end).format('LT')
        var confirmPopup = $ionicPopup.confirm({
          title: title,
         
          template:start +"to"+ end,
        });
     
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };
      $scope.showAlert = function(title,start,end) {
        start=moment(start).format('LT');
        end=moment(end).format('LT');
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: start +"to"+ end,
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
          console.log(res)
        });
      };
    $scope.uiConfig = {
        calendar:{
          height: 'auto',
          editable: false,
          header:{
              left:"",
            center: 'title',
            right: 'today prev,next'
          },
          eventClick:  function( date, jsEvent, view){
            console.log (date.title);
            console.log(date.start._i);
            console.log(date.end._i)
           // $scope.showAlert(date.title ,date.start. _i,date.end._i)
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
                    $scope.events=response.data;    
                    $scope.goals =  $scope.events.mentee_goals;
                    console.log( $scope.goals)
                    $scope.meetings = $scope.events.meeting_schedule;
                    $scope.tasks_exists=true;
                    $scope.tasks = $scope.events.mentee_tasks;
                        $scope.fun();
                        console.log('End async operation......');
                    })
                }
                else
                { 
                    $http(
                    {
                    url: localStorage.getItem('url')+"/myproject/mentor_calendar_event.php",
                    method:"GET",
                    params:{phone_no: localStorage.getItem('phoneno')}
                    })
                    .then(function(response){
                        $scope.events=response.data;    
                        $scope.goals =  $scope.events.mentor_goals;
                        $scope.meetings = $scope.events.meeting_schedule;
                        $scope.tasks_exists=false;
                        console.log( $scope.events)
                        $scope.fun();
                        console.log('End async operation......');
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
            $scope.count=$scope.count+1;
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
            $scope.count=$scope.count+1;
            $scope.addEvent1("meeting",y,m,d,sth,stm,eth,etm)
        }
        if($scope.tasks_exists){
        for (var i=0;i<$scope.tasks.length;i++)
        {
            var date = new Date($scope.tasks[i].due_date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            $scope.count=$scope.count+1
            $scope.addEvent("Task Due Date",y,m,d)
        }
    }
        console.log($scope.eventSources)
         $scope.$broadcast('scroll.refreshComplete');
         if($scope.count==$scope.tasks.length+$scope.goals.length+$scope.meetings.length)
         {
            alert("pupoi")
            console.log("count",$scope.count)
            console.log($scope.tasks.length+$scope.goals.length+$scope.meetings.length)
            $scope.hidepage=false;
         }
         else{
             alert("pupu")
             console.log("count",$scope.count)
             console.log($scope.tasks.length+$scope.goals.length+$scope.meetings.length)
         }
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
   
     
      
})