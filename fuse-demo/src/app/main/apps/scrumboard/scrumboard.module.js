(function ()
{
    'use strict';

    angular
        .module('app.scrumboard', [])
        .config(config)
        .run(run);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider
            .state('app.scrumboard', {
                abstract : true,
                url      : '/scrumboard',
                resolve  : {
                    BoardList: function (msApi)
                    {
                        return msApi.resolve('scrumboard.boardList@get');
                    }
                },
                bodyClass: 'scrumboard'
            })

            // Home
            .state('app.scrumboard.boards', {
                url  : '/boards',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/apps/scrumboard/views/boards/boards-view.html',
                        controller : 'BoardsViewController as vm'
                    }
                }
            })

            // Board
            .state('app.scrumboard.boards.board', {
                    url    : '/:id/:uri',
                    views  : {
                        'content@app'                                  : {
                            templateUrl: 'app/main/apps/scrumboard/scrumboard.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'scrumboardContent@app.scrumboard.boards.board': {
                            templateUrl: 'app/main/apps/scrumboard/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return BoardService.getBoardData($stateParams.id);
                        }
                    }
                }
            )

            // Add board
            .state('app.scrumboard.boards.addBoard', {
                    url    : '/add',
                    views  : {
                        'content@app'                                     : {
                            templateUrl: 'app/main/apps/scrumboard/scrumboard.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'scrumboardContent@app.scrumboard.boards.addBoard': {
                            templateUrl: 'app/main/apps/scrumboard/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return BoardService.addNewBoard();
                        }
                    }
                }
            )

            // Calendar
            .state('app.scrumboard.boards.board.calendar', {
                url  : '/calendar',
                views: {
                    'scrumboardContent@app.scrumboard.boards.board': {
                        templateUrl: 'app/main/apps/scrumboard/views/calendar/calendar-view.html',
                        controller : 'CalendarViewController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/scrumboard');

        // Api
        msApiProvider.register('scrumboard.boardList', ['app/data/scrumboard/board-list.json']);
        msApiProvider.register('scrumboard.board', ['app/data/scrumboard/boards/:id.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.scrumboard', {
            title : 'Scrumboard',
            icon  : 'icon-trello',
            state : 'app.scrumboard.boards',
            weight: 8
        });
    }

    /** @ngInject */
    function run(editableThemes)
    {
        /**
         * Inline Edit Configuration
         * @type {string}
         */
        editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
        editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';
    }

})();