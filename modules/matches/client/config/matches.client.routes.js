(function () {
  'use strict';

  angular
    .module('matches')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('matches', {
        abstract: true,
        url: '/matches',
        template: '<ui-view/>'
      })
      .state('matches.list', {
        url: '',
        templateUrl: 'modules/matches/client/views/list-matches.client.view.html',
        controller: 'MatchesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Matches List'
        }
      })
      .state('matches.create', {
        url: '/create',
        templateUrl: 'modules/matches/client/views/form-match.client.view.html',
        controller: 'MatchesController',
        controllerAs: 'vm',
        resolve: {
          matchResolve: newMatch
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Matches Create'
        }
      })
      .state('matches.edit', {
        url: '/:matchId/edit',
        templateUrl: 'modules/matches/client/views/form-match.client.view.html',
        controller: 'MatchesController',
        controllerAs: 'vm',
        resolve: {
          matchResolve: getMatch
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Match {{ matchResolve.name }}'
        }
      })
      .state('matches.view', {
        url: '/:matchId',
        templateUrl: 'modules/matches/client/views/view-match.client.view.html',
        controller: 'MatchesController',
        controllerAs: 'vm',
        resolve: {
          matchResolve: getMatch
        },
        data:{
          pageTitle: 'Match {{ articleResolve.name }}'
        }
      });
  }

  getMatch.$inject = ['$stateParams', 'MatchesService'];

  function getMatch($stateParams, MatchesService) {
    return MatchesService.get({
      matchId: $stateParams.matchId
    }).$promise;
  }

  newMatch.$inject = ['MatchesService'];

  function newMatch(MatchesService) {
    return new MatchesService();
  }
})();
