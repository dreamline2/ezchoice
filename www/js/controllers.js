angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var onShake = function (e) {
    // Code fired when a shake is detected
    alert(e+', shake it')
  };

  // Start watching for shake gestures and call "onShake"
  // alert('進入app')
  shake.startWatch(onShake);

  // Stop watching for shake gestures
  // shake.stopWatch();
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  $scope.data = (function(){
    var data = [];
    var Things = {};
    Things.length = 21;
    for (var i = Things.length - 1; i >= 0; i--) {
      data.push(i)
    };
    console.log(data)
    return data
  }())
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('slideHasChanged', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
})

.controller('ShakeCtrl', ['$scope', function(){
}])
.controller('ShakeDetailCtrl', ['$scope', function(){
}])

.controller('AccountCtrl', function($scope, $window, Idea) {
    $window.console.log(Idea.all());
    $scope.cards = [{
        id:1,
        title: 'Pretty Hate Machine',
        desc: 'Nine Inch Nails',
        avatar:'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/t1.0-1/p50x50/10314011_10202684084237605_1762184246269689844_n.jpg',
        img:'https://s3.amazonaws.com/ooomf-com-files/yIdlmSvfSZCyGkCkLt0P_lucaslof_2.jpg'
    },{
        id:2,
        title: 'Hate Machine',
        desc: 'Inch Nails',
        avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c94.42.526.526/s160x160/1010245_663304503685007_1056281799_n.jpg',
        img:'https://s3.amazonaws.com/ooomf-com-files/0S2u9VCRR1q74bwBQyA1__MG_9988.JPG'
    }];
})


.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main.tab.friends');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');

  $scope.toIntro = function(){
    $state.go('intro');
  }
});
