(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Apps
            'app.dashboards',
            'app.calendar',
            'app.e-commerce',
            'app.mail',
            'app.chat',
            'app.file-manager',
            'app.scrumboard',
            'app.gantt-chart',
            'app.todo',
            'app.contacts',
            'app.notes',

            // Pages
            'app.pages',

            // User Interface
            'app.ui',

            // Components
            'app.components'
        ]);
})();
