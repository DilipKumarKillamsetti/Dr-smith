// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('drsmith', [
  'ionic',
  'drsmith.controllers',
  'angularMoment',
  'ui.calendar'
])  

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider)
{
  $ionicConfigProvider.tabs.position('top');
  $stateProvider

  //SIDE MENU ROUTES
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/sidemenu.html",
    controller: 'sideMenuCtrl'
  })

  // home page
  .state('app.home', {
    url: '/home',
    cache:false,
    views: {
      'tab-home':{
        templateUrl: 'templates/home.html',
        controller: 'HomeTabCtrl'
      }
    }   
  })

  // goals page
  .state('app.goals', {
    url: '/goals',
    cache:false,
    views: {
      'tab-goals':{
        templateUrl: 'templates/goals.html',
        controller: 'goalsctrl'
      }
    } 
  })

  // forum page
  .state('app.forum', {
    url: '/forum',
    cache:false,
    views: {
      'tab-forum':{
        templateUrl: 'templates/forum.html',
      //  controller: 'goalsctrl'
      }
    } 
    
  })
  //login page
  .state('login', {
    url: "/login",
    views: {
      '': {
        templateUrl: "templates/login.html",
        controller:'loginctrl'
      },
      onEnter: function($state){
        if(localStorage.getItem('login')=="true"){
          $state.go('app.home');
        }
      
      }
    }
  })
  //state for mentee login
  .state('app.mentee_home', {
    url: "/mentee_home",
    cache:false,
    views: {
      'tab-home': {
        templateUrl: "templates/mentee_home.html",
        controller:'mentee_homectrl'
      }
    }
  })
  .state('app.resources',{
    url:"/resources",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/resources.html",
        controller:'sideMenuCtrl'
      }
    }
    
  })
  .state('app.profile',{
    url:"/profile",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/profile.html",
        controller:'profileCtrl'
      }
    } 
  })

  .state('app.mymentor',{
    url:"/mymentor",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/mymentor.html",
        controller:'sideMenuCtrl'
      }
    } 
  })

  .state('app.mentorslist',{
    url:"/mentorslist",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/mentorslist.html",
        controller:'sideMenuCtrl'
      }
    }
  })
  .state('app.calender',{
    url:"/calender",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/calender.html",
        controller:'calenderEveCtrl'
      }
    } 
  })
  .state('app.webinar',{
    url:"/webinar",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/webinar.html",
        controller:'calenderEveCtrl'
      }
    } 
  })

  .state('app.iframe',{
    url:"/iframe/:url",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/iframe.html",
        controller:'calenderEveCtrl'
      }
    } 
  })
  .state('app.mentorforum',{
    url:"/mentorforum",
    cache:false,
    views: {
      'tab-forum': {
        templateUrl:"templates/mentorforum.html",
        controller:'forumTabctrl'
      }
    } 
  })
  
  
  .state('app.mentor_forum_comments',{
    url:"/mentorforum_comments/:id",
    cache:false,
    views: {
      'tab-forum': {
        templateUrl:"templates/mentorforum_comments.html",
        controller:'forumTabctrl'
      }
    } 
  })

  .state('app.openforum',{
    url:"/openforum",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/openforum.html",
        controller:'forumTabctrl'
      }
    } 
  })


  .state('app.open_forum_comments',{
    url:"/openforum_comments/:id",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/openforum_comments.html",
        controller:'forumTabctrl'
      }
    } 
  })


  .state('app.report_abuse',{
    url:"report_abuse",
    cache:false,
    views: {
      'tab-home': {
        templateUrl:"templates/report_abuse.html",
        controller:'sideMenuCtrl'
      }
    } 
  })


  //state for mentee login and functionality-->mentee goals and adding goals
  .state('app.mentee_goals',{
    url:'/mentee_goals/:mentee_id',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_goals.html",
        controller:"mentee_homectrl"
      }
    }
  })
  //state for mentee login functionality --->display comments on goals written by mentee and mentor and add comment
  .state('app.goal_comments',{
    url:'/goal_comments/:goal_id',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:"templates/goal_comments.html",
        controller:"mentee_homectrl"
      }
    }
  })
    //state for mentee login functionality ---> display tasks given by mentor
  .state('app.mentee_tasks',{
    url:'/mentee_tasks',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_tasks.html",
        controller:"mentee_homectrl"
      }
    }
  })
 // state for mentee login functionality --->display comments on tasks written by mentor and mentee add comment
  .state('app.mentee_task_comments',{
    url:'/mentee_task_comments/:id',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_task_comments.html",
        controller:"commentsctrl"
      }
    }
  })
  .state('app.mentee_interactions',{
    url:'/mentee_interactions',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_interactions.html",
        controller:"mentee_homectrl"
      }
    }
  })

  .state('app.mentee', {
    url: "/mentee/:id",
    cache:false,
    views: {
      'tab-home': {
        templateUrl: "templates/mentee.html",
        controller: 'menteectrl'
      }
    }
  })
  .state('app.menteegoals',{
    url:"/menteegoals/:mentee_id/:mentee_name/:mentee_address",
    cache:false,
    views:{
      'tab-home':{
        templateUrl: "templates/menteegoals.html",
        controller: 'menteectrl'
      }
    }
  })
  .state('app.menteegoals_comments', {
    url: "/menteegoals_comments/:id/:mentee_id",
    cache:false,
    views: {
      'tab-home': {
        templateUrl: "templates/menteegoals_comments.html",
        controller: 'commentsctrl'
      }
    }
  })
  .state('app.menteetasks',{
    url:"/menteetasks/:mentee_id/:mentee_name/:mentee_address",
    cache:false,
    views:{
      'tab-home':{
        templateUrl: "templates/menteetasks.html",
        controller: 'menteectrl'
      }
    }
  })
  .state('app.menteetask_comments', {
    url: "/menteetask_comments/:id/:task",
    cache:false,
    views: {
      'tab-home': {
        templateUrl: "templates/menteetask_comments.html",
        controller: 'commentsctrl'
      }
    }
  })
  .state('app.interactions',{
    url:'/interactions/:mentee_id',
    cache:false,
    views: {
      'tab-home': {
        templateUrl:'templates/interactions.html',
        controller:'menteectrl'
      }
    }
  })
  .state('app.mentor_messages',{
    url:'/messages/:reciever_id/:reciever_name',
    cache:false,
    views: {
      'tab-home': {
        templateUrl:'templates/messages.html',
        controller:'messageCtrl'
      }
    }
  })


  .state('app.mentee_messages',{
    url:'/messages',
    cache:false,
    views: {
      'tab-home': {
        templateUrl:'templates/messages.html',
        controller:'messageCtrl'
      }
    }
  })

  .state('app.interaction_comments',{
    url:'/interaction_comments/:interaction_id',
    cache:false,
    views:{
      'tab-home':{
        templateUrl:'templates/interaction_comments.html',
        controller: 'commentsctrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/login');
})
