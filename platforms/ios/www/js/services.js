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


.factory('Explore', ['$http', function($http){

  var ExploreData = {};

  var successCallback = function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      ExploreData = data;
      console.log(data)
    };

  var errorCallback = function(data, status, headers, config){
      console.log(data)
      alert('error')
  };


  return {
    all: function() {
      $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').success(successCallback).error(errorCallback);
      console.log(ExploreData)
      return ExploreData
    }
  };
}])


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


