//Matches service used to communicate Matches REST endpoints
(function () {
  'use strict';

  angular
    .module('matches')
    .factory('MatchesService', MatchesService);

  MatchesService.$inject = ['$resource'];

  function MatchesService($resource) {
    return $resource('api/matches/:matchId', {
      matchId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
