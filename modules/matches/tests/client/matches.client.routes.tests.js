(function () {
  'use strict';

  describe('Matches Route Tests', function () {
    // Initialize global variables
    var $scope,
      MatchesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MatchesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MatchesService = _MatchesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('matches');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/matches');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MatchesController,
          mockMatch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('matches.view');
          $templateCache.put('modules/matches/client/views/view-match.client.view.html', '');

          // create mock Match
          mockMatch = new MatchesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Match Name'
          });

          //Initialize Controller
          MatchesController = $controller('MatchesController as vm', {
            $scope: $scope,
            matchResolve: mockMatch
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:matchId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.matchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            matchId: 1
          })).toEqual('/matches/1');
        }));

        it('should attach an Match to the controller scope', function () {
          expect($scope.vm.match._id).toBe(mockMatch._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/matches/client/views/view-match.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MatchesController,
          mockMatch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('matches.create');
          $templateCache.put('modules/matches/client/views/form-match.client.view.html', '');

          // create mock Match
          mockMatch = new MatchesService();

          //Initialize Controller
          MatchesController = $controller('MatchesController as vm', {
            $scope: $scope,
            matchResolve: mockMatch
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.matchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/matches/create');
        }));

        it('should attach an Match to the controller scope', function () {
          expect($scope.vm.match._id).toBe(mockMatch._id);
          expect($scope.vm.match._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/matches/client/views/form-match.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MatchesController,
          mockMatch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('matches.edit');
          $templateCache.put('modules/matches/client/views/form-match.client.view.html', '');

          // create mock Match
          mockMatch = new MatchesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Match Name'
          });

          //Initialize Controller
          MatchesController = $controller('MatchesController as vm', {
            $scope: $scope,
            matchResolve: mockMatch
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:matchId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.matchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            matchId: 1
          })).toEqual('/matches/1/edit');
        }));

        it('should attach an Match to the controller scope', function () {
          expect($scope.vm.match._id).toBe(mockMatch._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/matches/client/views/form-match.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
