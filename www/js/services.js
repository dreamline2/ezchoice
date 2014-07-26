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
    { id: 0, name: '平價美食', tag: 'Parity'},
    { id: 1, name: '閒聊簡餐', tag: 'Meals'},
    { id: 2, name: '高檔美食', tag: 'Restaurant'},
    { id: 3, name: '優質空間', tag: 'Space'}
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



.factory('List', function($q, $timeout, $http, api_url) {

  var movies = [];


  return {
    data: {},
    setSize: function(size){
      para.size = size;
    },
    all: function() {

    $http.get(api_url + 'post?size=60').then(function(res){
      movies = res;
    });
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(movies);
      }, 1000);
      return deferred.promise;
    },
    allSync : function() {
      return movies;
    },
    get: function(movieId) {
      // Simple index lookup
      for(var i=0, l=movies.length; i < l; i++) {
        if(movies[i].id == movieId) {
          return movies[i];
        }
      }
    },
    pushItem: function(callback){
      $http.get(api_url + 'explore?latlng=(25,121)&tags=[%22foods%22]&size=60').then(callback);
    }


  }
})

.factory('Recommend', function($q, $timeout, $http, api_url) {


  var movies = [];

  // var tag = JSON.stringify()
  var para = {
    latlng: '(25,121)',
    tags: '[%22foods%22]',
    size: 6,
    img_id: ''
  }

  return {
    list: [],
    setSize: function(size){
      para.size = size;
    },
    setLatlng: function(latlng){
      para.latlng = latlng;
    },
    setTags: function(tags){
      para.tags = tags;
    },
    setImgId: function(id){
      para.img_id = id;
    },
    all: function() {
      $http.get(api_url + 'recommend?tags='+para.tags+'&size='+para.size+'&latlng='+para.latlng+'&img_id='+para.img_id).then(function(res){
        movies = res;
      });
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(movies);
      }, 1000);
      return deferred.promise;
    },
    allSync : function() {
      $http.get(api_url + 'recommend?tags='+para.tags+'&size='+para.size+'&latlng='+para.latlng+'&img_id='+para.img_id).then(function(res){
        movies = res;
      });
      return movies;
    },
    get: function(movieId) {
      // Simple index lookup
      for(var i=0, l=movies.length; i < l; i++) {
        if(movies[i].id == movieId) {
          return movies[i];
        }
      }
    }
  }


})


.factory('Explore', function($q, $timeout, $http, api_url) {

  var movies = [];
  var para = {
    latlng: '(25,121)',
    tags: '[%22foods%22]',
    size: 6,
    img_id: ''
  }




  return {
    setSize: function(size){
      para.size = size;
    },
    setLatlng: function(latlng){
      para.latlng = latlng;
    },
    setTags: function(tags){
      para.tags = tags;
    },
    setImgId: function(id){
      para.img_id = id;
    },
    all: function() {
      $http.get(api_url + 'explore?latlng='+para.latlng+'&tags='+para.tags+'&size='+para.size+'&img_id='+para.img_id).then(function(res){
        movies = res;
      });
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(movies);
      }, 1000);
      return deferred.promise;
    },
    allSync : function() {
      return movies;
    },
    get: function(movieId) {
      // Simple index lookup
      for(var i=0, l=movies.length; i < l; i++) {
        if(movies[i].id == movieId) {
          return movies[i];
        }
      }
    }
  }
})

.factory('Login', function($q, $timeout, $http, api_url) {

  var movies = [];
  var data = {
    email: '',
    password: ''
  };
  var header = {
      'Content-Type': 'application/x-www-form-urlencoded'
  };

  return {
    loginStatus: false,
    user: {},
    setEmail: function(email){
      data.email = email;
    },
    setPassword: function(password){
      data.password = password;
    },
    letGo: function(callback) {
      console.log(data)
      // $http.post(api_url + 'login/', header, data).then(callback);
      $http({
          url: api_url + "login/",
          dataType: "json",
          method: "POST",
          headers: header,
          data: data
      }).success(callback);
    }
  }
})


.factory('Register', function($q, $http, api_url) {

  var movies = [];
  var data = {
    name: '',
    email: '',
    password: ''
  };
  var header = {
      'Content-Type': 'application/x-www-form-urlencoded'
  };

  return {
    setName: function(name){
      data.name = name;
    },
    setEmail: function(email){
      data.email = email;
    },
    setPassword: function(password){
      data.password = password;
    },
    letGo: function(callback) {
      console.log(data)
      // $http.post(api_url + 'signup', "json", data, header).then(callback);
      $http({
          url: api_url + "signup/",
          dataType: "json",
          method: "POST",
          headers: header,
          data: data
      }).success(callback);
    }


  }
})
// // module.service( 'serviceName', function );
// .factory('Explore', ['$http', '$q',function($http, $q){

//   // var ExploreData = {
//   //   latlng: '(25,121)',
//   //   tags: '[%22foods%22]',
//   //   size: 6
//   // };



//   // var successCallback = function(data, status, headers, config) {
//   //     // this callback will be called asynchronously
//   //     // when the response is available
//   //     Explore.data = data
//   //     // ExploreData = data;
//   //     console.log(Explore.data)
//   //   };

//   // var errorCallback = function(data, status, headers, config){
//   //     console.log(data)
//   //     alert('error')
//   // };

//   //   function getExplore(){
//   //     var request = $http({
//   //       method: 'GET',
//   //       url: 'http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6'
//   //     }).then(function(response) {

//   //           if (typeof response.data === 'object') {
//   //              console.log(response)
//   //               return response.data;
//   //           } else {
//   //               // invalid response
//   //               return $q.reject(response.data);
//   //           }

//   //       }, function(response) {
//   //           // something went wrong
//   //           return $q.reject(response.data);
//   //     });
//   //   }
//   // var Explore = {};
//   // $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(function(res){
//   //     Explore.a = res;
//   //     console.log(Explore.a)
//   // });



//   return function(latlng, tags, callback){$http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(callback)}
// }])

.factory('FacebookInfo', function(){

  var FacebookInfo = {
    user: {'name': '訪客'},
    photo: 'http://photos-a.ak.instagram.com/hphotos-ak-xpf1/10549703_1508658526032656_168841246_n.jpg'
  };

  return FacebookInfo
})

.factory('TakePicture', function(){

  var TakePicture = {
    lastPhoto: 'http://board.ek21.com/images/mood1/m1.gif'
  };

  return TakePicture
})


// .factory('Record', function($http, $window) {
//   // $window.APP = $window.APP || {};
//   var dataAll = {'a':'123'};
//   $window.console.log($window)
//   var successCallback = function(data, status, headers, config) {
//       // this callback will be called asynchronously
//       // when the response is available
//       // $window.console.log(data+','+status+','+headers+','+config);
//       $window.console.log(data)
//       // alert('success'+data[0].name+','+data[1].name)
//     };
//   var errorCallback = function(data, status, headers, config){
//       $window.console.log($window)
//       alert('error')
//   };
//   var data = {
//     id: 'b5553f8dcedf9a1714aba4a7a9587411',
//     secret_key: '42f4f8c9e60147aa3358f1346cca1f13'
//   };
//   data = {size:1};

//   $http.get('http://ggsingleruler.appspot.com/api/food/fish/list?size=2').success(successCallback).error(errorCallback);


//   // $http({
//   //   method: 'GET',
//   //   url: 'http://ggsingleruler.appspot.com/api/food/fish/list?size=2',
//   //   data: {
//   //     size: 2
//   //   }
//   // }).success(successCallback).error(errorCallback);
//     $scope.cards = [{
//         id: 1,
//         title: 'Pretty Hate Machine',
//         desc: 'Nine Inch Nails',
//         avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/t1.0-1/p50x50/10314011_10202684084237605_1762184246269689844_n.jpg',
//         img: 'https://s3.amazonaws.com/ooomf-com-files/yIdlmSvfSZCyGkCkLt0P_lucaslof_2.jpg'
//     }, {
//         id: 2,
//         title: 'Hate Machine',
//         desc: 'Inch Nails',
//         avatar: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c94.42.526.526/s160x160/1010245_663304503685007_1056281799_n.jpg',
//         img: 'https://s3.amazonaws.com/ooomf-com-files/0S2u9VCRR1q74bwBQyA1__MG_9988.JPG'
//     }];
//   return {
//     all: function(){
//       return dataAll
//     }
//   }

// })

.factory('Record', function($q, $timeout, $http, api_url) {

  var movies = [];
  $http.get(api_url + 'explore?latlng=(25,121)&tags=[%22foods%22]&size=60').then(function(res){
    movies = res;
  });

  return {
    all: function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(movies);
      }, 1000);
      return deferred.promise;
    },
    allSync : function() {
      return movies;
    },
    get: function(movieId) {
      // Simple index lookup
      for(var i=0, l=movies.length; i < l; i++) {
        if(movies[i].id == movieId) {
          return movies[i];
        }
      }
    }
  }
})




// function getExport(callback){
//     $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(callback);
// }

