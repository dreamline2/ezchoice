angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

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
