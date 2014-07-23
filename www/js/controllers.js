angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
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

.controller('ShakeCtrl', ['$scope','shakeMenu', function($scope, shakeMenu){
  $scope.menu = shakeMenu.all();
}])

.controller('ShakeDetailCtrl', ['$scope', '$stateParams', '$ionicPlatform', 'shakeMenu', 'Camera', function($scope, $stateParams, $ionicPlatform, shakeMenu, Camera){
  $ionicPlatform.ready(function() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // shake.startWatch(onShake);

    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        var a = 'Latitude: '           + position.coords.latitude              + '<br />' +
                'Longitude: '          + position.coords.longitude             + '<br />' +
                'Altitude: '           + position.coords.altitude              + '<br />' +
                'Accuracy: '           + position.coords.accuracy              + '<br />' +
                'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                'Heading: '            + position.coords.heading               + '<br />' +
                'Speed: '              + position.coords.speed                 + '<br />' +
                'Timestamp: '          +                                   position.timestamp          + '<br />';

        alert(a)
    }

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

    function onShake() {
      // Code fired when a shake is detected
      console.log('搖')
      alert('快搖')
    };


  });


  $scope.menu = shakeMenu.get($stateParams.menuId);

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 100,
      // targetWidth: 320,
      // targetHeight: 320,
      saveToPhotoAlbum: true
    });
  };




}])

.controller('AccountCtrl', function($scope, Idea) {
    console.log(Idea.all());
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

