angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('LoginCtrl', function($scope, $state, $ionicModal, Login) {})
.controller('RegisterCtrl', function($scope, $state, $ionicModal) {})








.controller('FirstCtrl', function($scope, $state) {
    $scope.goIntro = function() {
        $state.go('intro');
    }
})


.controller('MenuCtrl', function($scope, $rootScope, FacebookInfo) {

    $scope.user = FacebookInfo.user;
    $scope.user.photo = FacebookInfo.photo;

})


.controller('TabsCtrl', function($scope, $rootScope, $state, TakePicture, $ionicNavBarDelegate, Camera) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        // event.preventDefault();
        // console.log($ionicNavBarDelegate)
        // console.log($ionicNavBarDelegate)

        for ( a in toState.views) {
            for( b in fromState.views) {
                if(a==b){
                    $scope.navShow = false;
                }
            }
        };

        if(toState.name == 'main.tab.friends' || toState.name == 'main.tab.shake' || toState.name == 'main.tab.account' ) {
            $scope.navShow = true;
        }

        console.log(toState.name)
        console.log('2'+fromState.name)

        // transitionTo() promise will be rejected with
        // a 'transition prevented' error
    })
        $scope.navShow = function() {
            return true
        }
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


    $scope.a = function() {

        $ionicNavBarDelegate.showBar(false);
    }

})

.controller('PhotoCtrl', function($scope, $state, TakePicture, $ionicPopup) {
    $scope.lastPhoto = TakePicture.lastPhoto;
     $scope.showConfirm = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: '確認提交分享',
         template: '恭喜，這是你想分享的好去處嗎?'
       });
       confirmPopup.then(function(res) {
         if(res) {
           console.log('You are sure');

           console.log('發 post')
           $state.go('main.tab.account')
         } else {
           console.log('You are not sure');
         }
       });
     };
})

.controller('FriendsCtrl', function($scope, $http, $timeout, $ionicBackdrop, $ionicLoading, Friends, Explore, List) {

    $scope.show = function() {
        $ionicLoading.show({
            template: '<i class="icon ion-loading-c" style="font-size:2em;"></i>'
        });
        $ionicBackdrop.release();
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.show();

    List.all().then(function(res) {
        $scope.hide();
        $scope.friends = res.data;
        console.log(res)
        Explore.data = res.data;
        // console.log(api_url)
    });
  $scope.onReorder = function(el, start, end) {
    ionic.Utils.arrayMove($scope.items, start, end);
  };

  $scope.onRefresh = function() {
    console.log('ON REFRESH');

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  }
  $scope.loadMore = function() {
    console.log('Loading more!');
    List.pushItem(function(res){
        // $scope.hide();
        // $scope.friends = res.data;
        for (var i = 0; i < res.data.length; i++) {
            $scope.friends.push(res.data[i]);
            // console.log(res.data[i])
        };
        // console.log(res)
        // Explore.data = res.data;
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
  }
  // $scope.loadMore = function() {
  //   console.log('loadMore')
  //   List.pushItem(function(res){
  //       console.log(res)
  //       $scope.friends = res.data;
  //       // console.log(res)
  //       Explore.data = res.data;
  //   });
  //   // $http.get('/more-items').success(function(items) {
  //   //   useItems(items);
  //   //   $scope.$broadcast('scroll.infiniteScrollComplete');
  //   // });
  // };

  // $scope.$on('stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });


})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, Explore, List) {

    console.log(Explore.data)
    var index = 0,
        l = Explore.data.length;

    for (var i = 0; i < l; i++) {
        if (Explore.data[i].img_id == $stateParams.friendId) {
            index = i;
            continue
        }
    };
    $scope.friend = Explore.data[index];
    console.log($scope.friend)
})

.controller('ShakeCtrl', function($scope, $ionicPlatform, shakeMenu) {
    $scope.menu = shakeMenu.all();
})

.controller('ShakeOptionCtrl', function($scope, $state, $timeout, $rootScope, $stateParams, $ionicLoading, $ionicBackdrop, $ionicPlatform, shakeMenu, Camera, Explore, Recommend) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        // shake.stopWatch();
    })
    $scope.show = function() {
        $ionicLoading.show({
            template: '<i class="icon ion-loading-c" style="font-size:2em;"></i>'
        });
        $ionicBackdrop.release();
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };
    // $scope.items = [
    //     { text: "HTML5", checked: true },
    //     { text: "CSS3", checked: false },
    //     { text: "JavaScript", checked: false },
    //     { text: "HTML5", checked: true },
    //     { text: "CSS3", checked: false },
    //     { text: "JavaScript", checked: false }
    // ];

    $scope.menu = shakeMenu.get($stateParams.menuId);
    // console.log($scope.menu)
    $ionicPlatform.ready(function() {

        $scope.show();

        // 設定參數
        Explore.setSize(6);
        // Explore.setLatlng('(25,121)');
        var tags = JSON.stringify(["food"]);
        Explore.setTags(tags);

        console.log(Explore.allSync())

        $scope.checkItem = function(i){
            // $scope.items
            // console.log(i)
            // console.log($scope.cards[i])
            $scope.cards[i].checked = !$scope.cards[i].checked;
            // $scope.refresh();
            // $scope.items[i].checked;
            // $scope.items.checked
            // return $scope.items[$index].checked
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // shake.startWatch(onShake);

        function onSuccess(position) {
            // var element = document.getElementById('geolocation');
            // var a = 'Latitude: ' + position.coords.latitude + '<br />' +
            //     'Longitude: ' + position.coords.longitude + '<br />' +
            //     'Altitude: ' + position.coords.altitude + '<br />' +
            //     'Accuracy: ' + position.coords.accuracy + '<br />' +
            //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
            //     'Heading: ' + position.coords.heading + '<br />' +
            //     'Speed: ' + position.coords.speed + '<br />' +
            //     'Timestamp: ' + position.timestamp + '<br />';
            $scope.position = position;
            // console.log(a)
            Explore.setLatlng('('+position.coords.latitude+','+position.coords.longitude+')');




            var tags = JSON.stringify([$scope.menu.tag]);

            // console.log(tags)

            Explore.setSize(6);
            Explore.setLatlng('('+$scope.position.coords.latitude+','+$scope.position.coords.longitude+')');
            Explore.setTags(tags);
            Explore.setImgId();
            Explore.all().then(function(res) {
                $scope.hide();
                $scope.cards = res.data;
                // console.log(res.data)
                // Explore.cards = res.data;
                // console.log(api_url)
            });
        }

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        function onShake() {
            // Code fired when a shake is detected
            // console.log('搖')
            alert('快搖')
            Explore.setSize(6);
            Explore.setLatlng('('+$scope.position.coords.latitude+','+$scope.position.coords.longitude+')');
            Explore.setTags(tags);
            Explore.setImgId();
            Explore.all().then(function(res) {
                // $scope.hide();
                $scope.cards = res.data;
                // console.log(res.data)
                // Explore.cards = res.data;
                // console.log(api_url)
            });
        };


    });
  $scope.onRefresh = function() {
    console.log('ON REFRESH');


    var tag = [];

    for(var i =0;i<$scope.cards.length;i++){
        if($scope.cards[i].checked == true){

            console.log($scope.cards[i])
            for(var j = 0; j< $scope.cards[i].tags.length;j++){
                tag.push($scope.cards[i].tags[j])
            }

        }

    }

    var tags = JSON.stringify(tag);

    console.log(tags)

    Recommend.setSize(6);
    Recommend.setLatlng('('+$scope.position.coords.latitude+','+$scope.position.coords.longitude+')');
    Recommend.setTags(tags);
    Recommend.setImgId();
    Recommend.all().then(function(res){
        // $scope.hide();
        // $scope.friends = res.data;
        // for (var i = 0; i < res.data.length; i++) {
        //     $scope.friends.push(res.data[i]);
        //     // console.log(res.data[i])
        // };
        // allSync()

        // $scope.cards[i].tags
        // $scope.items = res.data;
        Recommend.list = res.data;
        $scope.$broadcast('scroll.refreshComplete');
        $state.go('main.tab.recommend');
        // console.log(res.data)
        // $scope.$broadcast('scroll.refreshComplete');
        // console.log(res)
        // Explore.data = res.data;
    });
    // $timeout(function() {
    //   $scope.$broadcast('scroll.refreshComplete');
    //   // $state.go('main.tab.recommend');
    // }, 1000);
  }

})

.controller('AccountCtrl', function($scope, $ionicLoading, $ionicBackdrop, Record) {

    $scope.show = function() {
        $ionicLoading.show({
            template: '<i class="icon ion-loading-c" style="font-size:2em;"></i>'
        });
        $ionicBackdrop.release();
    };

    $scope.hide = function() {
        $ionicLoading.hide();
    };

    $scope.show();

    Record.all().then(function(res) {
        $scope.hide();
        $scope.cards = res.data;
        console.log(res.data)
        // Explore.cards = res.data;
        // console.log(api_url)
    });


    // $scope.cards = [{
    //     id: 1,
    //     title: 'Pretty Hate Machine',
    //     desc: 'Nine Inch Nails',
    //     avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/t1.0-1/p50x50/10314011_10202684084237605_1762184246269689844_n.jpg',
    //     img: 'https://s3.amazonaws.com/ooomf-com-files/yIdlmSvfSZCyGkCkLt0P_lucaslof_2.jpg'
    // }, {
    //     id: 2,
    //     title: 'Hate Machine',
    //     desc: 'Inch Nails',
    //     avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c94.42.526.526/s160x160/1010245_663304503685007_1056281799_n.jpg',
    //     img: 'https://s3.amazonaws.com/ooomf-com-files/0S2u9VCRR1q74bwBQyA1__MG_9988.JPG'
    // }];
})


.controller('IntroCtrl', function($rootScope, $scope, $state, $ionicSlideBoxDelegate, $ionicModal, $ionicPopup, Facebook, FacebookInfo, Login, Register) {
    // Here, usually you should watch for when Facebook is ready and loaded
    // $scope.$watch(function() {
    //     return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    // }, function(newVal) {
    //     $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    // });


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.registerModal = modal;
    });

    $scope.getLogin = function() {
        $scope.loginModal.show();
    };

    $scope.getRegister = function() {
        $scope.registerModal.show();
    };

    $scope.closeLogin = function() {
        $scope.loginModal.hide();
    }

    $scope.closeRegister = function() {
        $scope.registerModal.hide();
    }

     $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Don\'t eat that!',
         template: 'It might taste good'
       });
       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };

    $scope.loggedIn = false;

    // From now on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
    // $scope.show = function() {
    //     $ionicLoading.show({
    //         template: '<i class="icon ion-loading-c" style="font-size:2em;"></i>'
    //     });
    //     $ionicBackdrop.release();
    // };

    // $scope.hide = function() {
    //     $ionicLoading.hide();
    // };

    // $scope.show();
    $scope.user = {};
    $scope.user.emailLog = "";
    $scope.user.passLog  = "";

    $scope.newUser = {};
    $scope.user.userName = "";
    $scope.user.email  = "";
    $scope.user.password  = "";
    // var emailLog = $scope.emailLog != null?$scope.emailLog:'';
    // var passLog = $scope.passLog != null?$scope.passLog:'';
    $scope.Login = function(user) {
        console.log(user.emailLog+','+user.passLog+','+user)

        Login.setEmail(user.emailLog);
        Login.setPassword(user.passLog);
        Login.letGo(function(res){
            console.log(res)
            $scope.loginModal.hide();
            $state.go('main.tab.friends');
        });

    }

    $scope.Register = function(user) {
        // console.log(user.userName+','+user.email+','+user.password)
        console.log(Register)
        Register.setName(user.userName);
        Register.setEmail(user.email);
        Register.setPassword(user.password);
        Register.letGo(function(res){
            console.log(res)
            $scope.registerModal.hide();
            // $state.go('main.tab.friends');
        });
    }
    $scope.login = function() {
        $scope.loginModal.hide();
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
.controller('RecommendCtrl', function($scope, $state, $ionicModal, Recommend) {

    $scope.items = Recommend.list;

})