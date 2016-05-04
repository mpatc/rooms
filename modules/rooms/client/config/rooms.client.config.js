(function () {
  'use strict';

  angular
    .module('rooms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Rooms',
      state: 'rooms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'rooms', {
      title: 'List Rooms',
      state: 'rooms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'rooms', {
      title: 'Create Room',
      state: 'rooms.create',
      roles: ['user']
    });
  }
})();
