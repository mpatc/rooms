(function () {
  'use strict';

  angular
    .module('matches')
    .controller('MatchesListController', MatchesListController);

  MatchesListController.$inject = ['MatchesService'];

  function MatchesListController(MatchesService) {
    var vm = this;

    vm.matches = MatchesService.query();
  }
})();
