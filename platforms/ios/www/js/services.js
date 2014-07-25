angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [];


  for (var i = 0; i < 21; i++) {
    friends.push({ id: i, name: 'Ash Ketchum' })
  };

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('shakeMenu', [function () {
  var menu = [
    { id: 0, name: '平價美食' },
    { id: 1, name: '閒聊簡餐' },
    { id: 2, name: '高檔美食' },
    { id: 3, name: '優質空間' }
  ];

  return {
    all: function() {
      return menu
    },
    get: function(menuId) {
      // Simple index lookup
      return menu[menuId];
    }
  };
}])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

// module.service( 'serviceName', function );
.factory('Explore', ['$http', '$q', function($http, $q){

  // var ExploreData = {
  //   latlng: '(25,121)',
  //   tags: '[%22foods%22]',
  //   size: 6
  // };

  var Explore = {};


  // var successCallback = function(data, status, headers, config) {
  //     // this callback will be called asynchronously
  //     // when the response is available
  //     Explore.data = data
  //     // ExploreData = data;
  //     console.log(Explore.data)
  //   };

  // var errorCallback = function(data, status, headers, config){
  //     console.log(data)
  //     alert('error')
  // };

  //   function getExplore(){
  //     var request = $http({
  //       method: 'GET',
  //       url: 'http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6'
  //     }).then(function(response) {

  //           if (typeof response.data === 'object') {
  //              console.log(response)
  //               return response.data;
  //           } else {
  //               // invalid response
  //               return $q.reject(response.data);
  //           }

  //       }, function(response) {
  //           // something went wrong
  //           return $q.reject(response.data);
  //     });
  //   }
  // $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').success(successCallback).error(errorCallback);

  return Explore
}])

.factory('FacebookInfo', function(){

  var FacebookInfo = {
    user: {'name': '訪客'},
    photo: 'https://pbs.twimg.com/profile_images/378800000576211895/94a4a4b25f5d692cb836baf74b9e64b1_400x400.png'
  };

  return FacebookInfo
})

.factory('TakePicture', function(){

  var TakePicture = {
    lastPhoto: 'http://board.ek21.com/images/mood1/m1.gif'
  };

  return TakePicture
})


.factory('Idea', function($http, $window) {
  // $window.APP = $window.APP || {};
  var dataAll = {'a':'123'};
  $window.console.log($window)
  var successCallback = function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      // $window.console.log(data+','+status+','+headers+','+config);
      $window.console.log(data)
      // alert('success'+data[0].name+','+data[1].name)
    };
  var errorCallback = function(data, status, headers, config){
      $window.console.log($window)
      alert('error')
  };
  var data = {
    id: 'b5553f8dcedf9a1714aba4a7a9587411',
    secret_key: '42f4f8c9e60147aa3358f1346cca1f13'
  };
  data = {size:1};

  $http.get('http://ggsingleruler.appspot.com/api/food/fish/list?size=2').success(successCallback).error(errorCallback);


  // $http({
  //   method: 'GET',
  //   url: 'http://ggsingleruler.appspot.com/api/food/fish/list?size=2',
  //   data: {
  //     size: 2
  //   }
  // }).success(successCallback).error(errorCallback);

  return {
    all: function(){
      return dataAll
    }
  }

});


