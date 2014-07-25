// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'facebook'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, FacebookProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  FacebookProvider.init('331977093624693');
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('main', {
      url: "/main",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    })

    .state('main.tab', {
      url: "/tab",
      abstract: true,
      views:{
        'menu-content': {
          templateUrl: "templates/tabs.html",
          controller: 'TabsCtrl'
        }
      }
    })

    // Each tab has its own nav history stack:

    .state('main.tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('main.tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('main.tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('main.tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('main.tab.photo', {
      url: '/photo',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-photo.html',
          controller: 'PhotoCtrl'
        }
      }
    })

    // setting
    .state('main.tab.camera', {
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-camera.html',
          controller: 'CameraCtrl'
        }
      }
    })

    // setting
    .state('main.tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html',
          controller: 'SettingCtrl'
        }
      }
    })

    // shake
    .state('main.tab.shake', {
      url: '/shake',
      views: {
        'tab-shake': {
          templateUrl: 'templates/tab-shake.html',
          controller: 'ShakeCtrl'
        }
      }
    })

    // shake detail
    .state('main.tab.shake-option', {
      url: '/shakes/:menuId',
      views: {
        'tab-shake': {
          templateUrl: 'templates/tab-shake-option.html',
          controller: 'ShakeOptionCtrl'
        }
      }
    })

    // shake detail
    .state('main.tab.shake-detail', {
      url: '/shakes/detail',
      views: {
        'tab-shake': {
          templateUrl: 'templates/tab-shake-detail.html',
          controller: 'ShakeDetailCtrl'
        }
      }
    })

    // Recommend
    .state('main.tab.recommend', {
      url: '/recommend',
      views: {
        'tab-recommend': {
          templateUrl: 'templates/tab-recommend.html',
          controller: 'ecommendCtrl'
        }
      }
    })

    // intro
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })

    // first
    .state('first', {
      url: '/',
      templateUrl: 'templates/first.html',
      controller: 'FirstCtrl'
    })

        // login
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

        // register
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
