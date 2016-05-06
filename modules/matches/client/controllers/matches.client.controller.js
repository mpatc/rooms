(function () {
  'use strict';

  // Matches controller
  angular
    .module('matches')
    .controller('MatchesController', MatchesController);

  MatchesController.$inject = ['$scope', '$state', 'Authentication', 'matchResolve'];

  function MatchesController ($scope, $state, Authentication, match) {
    var vm = this;

    vm.authentication = Authentication;
    vm.match = match;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Match
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.match.$remove($state.go('matches.list'));
      }
    }

    // Save Match
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.matchForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.match._id) {
        vm.match.$update(successCallback, errorCallback);
      } else {
        vm.match.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('matches.view', {
          matchId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
