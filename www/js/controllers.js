angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('MenuCtrl', function($scope, $rootScope, FacebookInfo) {
    // FacebookInfo.readInfo($scope.user, $scope, function(){
    //     console.log($scope.user)
    // });
    // $scope.user = {name:'Wei'};
    // $rootScope.sampleFunction = function( data ){

    //     console.log(data);
    //     // your logic

    // };
    $scope.user = FacebookInfo.user;
    $scope.user.photo = FacebookInfo.photo;
    console.log($scope.user)
    console.log($scope.user.photo)
    // console.log($rootScope.shareData)
})


.controller('TabsCtrl', function($scope, $state, TakePicture, $ionicNavBarDelegate) {

    $scope.getPhoto = function() {
        console.log('Getting camera');
        Camera.getPicture().then(function(imageURI) {
          console.log(imageURI);
          TakePicture.lastPhoto = imageURI;
          // $scope.lastPhoto = imageURI;
          $state.go('main.tab.photo');
        }, function(err) {
          console.err(err);
        }, {
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: false
        });
    }

    $scope.navShow = function() {
        return true
    }
    $scope.a = function() {

        $ionicNavBarDelegate.showBar(false);
    }
    console.log('上一夜'+$ionicNavBarDelegate.showBar(false))
})

.controller('PhotoCtrl', function($scope, $state, TakePicture) {
    $scope.lastPhoto = TakePicture.lastPhoto;
})

.controller('FriendsCtrl', function($scope, $http, Friends, Explore) {

    console.log(Explore.a)
    $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=60').then(function(res){
        $scope.friends = res.data;
        console.log(res)
        Explore.data = res.data;

    });


    // $scope.friends = $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').success(successCallback).error(errorCallback);;

    // var successCallback = function(data){
    //     return data
    // }

    // var errorCallback = function(data){
    //     console.log(data)
    // }
    // $scope.data = (function() {
    //     var data = [];
    //     var Things = {};
    //     Things.length = 21;
    //     for (var i = Things.length - 1; i >= 0; i--) {
    //         data.push(i)
    //     };
    //     console.log(data)
    //     return data
    // }())
    // $scope.data = Explore.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, Explore) {

    console.log(Explore.data)
    var index = 0,
        l = Explore.data.length;

    for (var i = 0; i < l ; i++) {
        if(Explore.data[i].img_id == $stateParams.friendId){
            index = i;
            continue
        }
    };
    $scope.friend = Explore.data[index];
    console.log($scope.friend)
})

.controller('ShakeCtrl', function($scope, $ionicPlatform, shakeMenu) {
    $scope.menu = shakeMenu.all();
    $ionicPlatform.ready(function() {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        shake.startWatch(onShake);

        function onSuccess(position) {
            // var element = document.getElementById('geolocation');
            var a = 'Latitude: ' + position.coords.latitude + '<br />' +
                'Longitude: ' + position.coords.longitude + '<br />' +
                'Altitude: ' + position.coords.altitude + '<br />' +
                'Accuracy: ' + position.coords.accuracy + '<br />' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                'Heading: ' + position.coords.heading + '<br />' +
                'Speed: ' + position.coords.speed + '<br />' +
                'Timestamp: ' + position.timestamp + '<br />';

            alert(a)
        }

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        function onShake() {
            // Code fired when a shake is detected
            console.log('搖')
            alert('快搖')
        };


    });
})

.controller('ShakeOptionCtrl', function($scope, $stateParams, $ionicPlatform, shakeMenu, Camera, Explore) {
    // console.log(Explore.all())
    // $scope.explore = Explore.all();

    // $ionicPlatform.ready(function() {

    //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    //     // shake.startWatch(onShake);

    //     function onSuccess(position) {
    //         var element = document.getElementById('geolocation');
    //         var a = 'Latitude: ' + position.coords.latitude + '<br />' +
    //             'Longitude: ' + position.coords.longitude + '<br />' +
    //             'Altitude: ' + position.coords.altitude + '<br />' +
    //             'Accuracy: ' + position.coords.accuracy + '<br />' +
    //             'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    //             'Heading: ' + position.coords.heading + '<br />' +
    //             'Speed: ' + position.coords.speed + '<br />' +
    //             'Timestamp: ' + position.timestamp + '<br />';

    //         alert(a)
    //     }

    //     function onError(error) {
    //         alert('code: ' + error.code + '\n' +
    //             'message: ' + error.message + '\n');
    //     }

    //     function onShake() {
    //         // Code fired when a shake is detected
    //         console.log('搖')
    //         alert('快搖')
    //     };


    // });


    $scope.menu = shakeMenu.get($stateParams.menuId);

    // $scope.getPhoto = function() {
    //     Camera.getPicture().then(function(imageURI) {
    //         console.log(imageURI);
    //         $scope.lastPhoto = imageURI;
    //     }, function(err) {
    //         console.err(err);
    //     }, {
    //         quality: 100,
    //         // targetWidth: 320,
    //         // targetHeight: 320,
    //         saveToPhotoAlbum: true
    //     });
    // };




})

.controller('AccountCtrl', function($scope, Idea) {
    console.log(Idea.all());
    $scope.cards = [{
        id: 1,
        title: 'Pretty Hate Machine',
        desc: 'Nine Inch Nails',
        avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/t1.0-1/p50x50/10314011_10202684084237605_1762184246269689844_n.jpg',
        img: 'https://s3.amazonaws.com/ooomf-com-files/yIdlmSvfSZCyGkCkLt0P_lucaslof_2.jpg'
    }, {
        id: 2,
        title: 'Hate Machine',
        desc: 'Inch Nails',
        avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c94.42.526.526/s160x160/1010245_663304503685007_1056281799_n.jpg',
        img: 'https://s3.amazonaws.com/ooomf-com-files/0S2u9VCRR1q74bwBQyA1__MG_9988.JPG'
    }];
})


.controller('IntroCtrl', function($rootScope, $scope, $state, $ionicSlideBoxDelegate, Facebook, FacebookInfo) {
    // Here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
        return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
        $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    });

    $scope.loggedIn = false;
    // From now on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
    $scope.login = function() {
        $state.go('main.tab.friends');
        // Facebook.login(function(response) {
        //     // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
        //     if (response.status == 'connected') {
        //         $scope.logged = true;
        //         $scope.me();
        //         // $scope.photo();
        //     }
        // });
    };

    $scope.getLoginStatus = function() {
        //
        $state.go('main.tab.friends');
        // Facebook.getLoginStatus(function(response) {
        //     console.log(response)
        //     if (response.status == 'connected') {
        //         $scope.$apply(function() {
        //             $scope.loggedIn = true;
        //         });
        //         $scope.me();
        //     } else {
        //         $scope.$apply(function() {
        //             $scope.loggedIn = false;
        //         });
        //     }
        // });
    };

    $scope.me = function() {
        Facebook.api('/me', function(response) {
            $scope.$apply(function() {
                // Here you could re-check for user status (just in case)
                // $scope.user = FacebookInfo.user;
                FacebookInfo.user = response;
                console.log(response)
                $scope.photo();
                // $state.go('main.tab.friends');
            });
        });
    };

    $scope.photo = function() {
        Facebook.api('/me/picture', function(response) {
            $scope.$apply(function() {
                // Here you could re-check for user status (just in case)
                // $scope.user = FacebookInfo.user;
                console.log(response.data.url)
                FacebookInfo.photo = response.data.url;
                $state.go('main.tab.friends');
            });
        });
    };
    // Called to navigate to the main app
    // $scope.fblogin = function() {
    // openFB.login(function(response) {
    //   console.log(response)
    //         if (response.status === 'connected') {
    //             alert('Facebook login succeeded, got access token: ' + response.authResponse.token);


    //             openFB.api({
    //                 path: '/me',
    //                 success: function(data) {
    //                     console.log(JSON.stringify(data));
    //                     // document.getElementById("userName").innerHTML = data.name;
    //                     // document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
    //                     $state.go('main.tab.friends');
    //                 },
    //                 error: function(data) {
    //                     console.log(data)
    //                 }
    //             });
    //         } else {
    //             alert('Facebook login failed: ' + response.error);
    //         }
    //     }, {
    //         scope: 'email,read_stream,publish_stream'
    //     });

    // $state.go('main.tab.friends');
    // };

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
