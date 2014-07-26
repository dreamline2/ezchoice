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



.factory('List', function($q, $timeout) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var movies = [
    {
      id: 'tt0080487',
      title: 'Caddyshack',
      released: '1980',
      description: 'An exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopherAn exclusive golf course has to deal with a brash new member and a destructive dancing gopher.',
      director: 'Harold Ramis',
      rating: 7.2
    },
    {
      id: 'tt0087332',
      title: 'Ghostbusters',
      released: '1984',
      description: 'Three unemployed parapsychology professors set up shop as a unique ghost removal service.',
      director: 'Ivan Reitman',
      rating: 7.8
    },
    {
      id: 'tt0097428',
      title: 'Ghostbusters II',
      released: '1989',
      description: 'The discovery of a massive river of ectoplasm and a resurgence of spectral activity allows the staff of Ghostbusters to revive the business.',
      director: 'Ivan Reitman',
      rating: 6.4
    },
    {
      id: 'tt0107048',
      title: 'Groundhog Day',
      released: '1993',
      description: 'A weatherman finds himself living the same day over and over again.',
      director: 'Harold Ramis',
      rating: 8.1
    },
    {
      id: 'tt0116778',
      title: 'Kingpin',
      released: '1996',
      description: 'A star bowler whose career was prematurely "cut off" hopes to ride a new prodigy to success and riches.',
      director: 'Bobby Farrelly, Peter Farrelly',
      rating: 6.8
    },
    {
      id: 'tt0335266',
      title: 'Lost in Translation',
      released: '2003',
      description: 'A faded movie star and a neglected young wife form an unlikely bond after crossing paths in Tokyo.',
      director: 'Sofia Coppola',
      rating: 7.8
    },
    {
      id: 'tt0079540',
      title: 'Meatballs',
      released: '1979',
      description: 'Wacky hijinks of counselors and campers at a less-than-average summer camp.',
      director: 'Ivan Reitman',
      rating: 5.9
    },
    {
      id: 'tt0128445',
      title: 'Rushmore',
      released: '1998',
      description: 'The king of Rushmore prep school is put on academic probation.',
      director: 'Wes Anderson',
      rating: 7.7
    },
    {
      id: 'tt0096061',
      title: 'Scrooged',
      released: '1988',
      description: 'A cynically selfish TV executive gets haunted by three spirits bearing lessons on Christmas Eve.',
      director: 'Richard Donner',
      rating: 6.9
    },
    {
      id: 'tt0083131',
      title: 'Stripes',
      released: '1981',
      description: 'Two friends who are dissatisfied with their jobs decide to join the army for a bit of fun.',
      director: 'Ivan Reitman',
      rating: 6.8
    },
    {
      id: 'tt0362270',
      title: 'The Life Aquatic with Steve Zissou',
      released: '2004',
      description: 'With a plan to exact revenge on a mythical shark that killed his partner, oceanographer Steve Zissou rallies a crew that includes his estranged wife, a journalist, and a man who may or may not be his son.',
      director: 'Wes Anderson',
      rating: 7.2
    },
    {
      id: 'tt0120483',
      title: 'The Man Who Knew Too Little',
      released: '1997',
      description: 'Murray is mistaken for a spy and must stop a plot to assasinate international leaders at a banquet.',
      director: 'Jon Amiel',
      rating: 6.4
    },
    {
      id: 'tt0265666',
      title: 'The Royal Tenenbaums',
      released: '2001',
      description: 'An estranged family of former child prodigies reunites when one of their member announces he has a terminal illness.',
      director: 'Wes Anderson',
      rating: 7.5
    },
    {
      id: 'tt0103241',
      title: 'What About Bob?',
      released: '1991',
      description: 'A successful psychiatrist loses his mind after one of his most dependent patients, a highly manipulative obsessive-compulsive, tracks him down during his family vacation.',
      director: 'Frank Oz',
      rating: 6.8
    },
    {
      id: 'tt1156398',
      title: 'Zombieland',
      released: '2009',
      description: 'A shy student trying to reach his family in Ohio, and a gun-toting tough guy trying to find the Last Twinkie and a pair of sisters trying to get to an amusement park join forces to travel across a zombie-filled America.',
      director: 'Ruben Fleischer',
      rating: 7.7
    }
  ];

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


// module.service( 'serviceName', function );
.factory('Explore', ['$http', '$q',function($http, $q){

  // var ExploreData = {
  //   latlng: '(25,121)',
  //   tags: '[%22foods%22]',
  //   size: 6
  // };



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
  // var Explore = {};
  // $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(function(res){
  //     Explore.a = res;
  //     console.log(Explore.a)
  // });



  return function(latlng, tags, callback){$http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(callback)}
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

// function getExport(callback){
//     $http.get('http://ezselector.appspot.com/explore?latlng=(25,121)&tags=[%22foods%22]&size=6').then(callback);
// }

