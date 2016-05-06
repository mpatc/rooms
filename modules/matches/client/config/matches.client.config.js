(function () {
  'use strict';

  angular
    .module('matches')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Matches',
      state: 'matches',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'matches', {
      title: 'List Matches',
      state: 'matches.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'matches', {
      title: 'Create Match',
      state: 'matches.create',
      roles: ['user']
    });
  }
})();
