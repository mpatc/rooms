(function () {
  'use strict';

  angular
    .module('rooms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rooms', {
        abstract: true,
        url: '/rooms',
        template: '<ui-view/>'
      })
      .state('rooms.list', {
        url: '',
        templateUrl: 'modules/rooms/client/views/list-rooms.client.view.html',
        controller: 'RoomsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rooms List'
        }
      })
      .state('rooms.create', {
        url: '/create',
        templateUrl: 'modules/rooms/client/views/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: newRoom
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Rooms Create'
        }
      })
      .state('rooms.edit', {
        url: '/:roomId/edit',
        templateUrl: 'modules/rooms/client/views/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: getRoom
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Room {{ roomResolve.name }}'
        }
      })
      .state('rooms.view', {
        url: '/:roomId',
        templateUrl: 'modules/rooms/client/views/view-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: getRoom
        },
        data:{
          pageTitle: 'Room {{ articleResolve.name }}'
        }
      });
  }

  getRoom.$inject = ['$stateParams', 'RoomsService'];

  function getRoom($stateParams, RoomsService) {
    return RoomsService.get({
      roomId: $stateParams.roomId
    }).$promise;
  }

  newRoom.$inject = ['RoomsService'];

  function newRoom(RoomsService) {
    return new RoomsService();
  }
})();
