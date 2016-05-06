(function () {
  'use strict';

  angular
    .module('stats')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Stats',
      state: 'stats',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'stats', {
      title: 'List Stats',
      state: 'stats.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'stats', {
      title: 'Create Stat',
      state: 'stats.create',
      roles: ['user']
    });
  }
})();
