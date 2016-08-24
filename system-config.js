// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    '@angular2-material': 'vendor/@angular2-material',
    'immutable': 'vendor/immutable/dist/immutable.js',
    'angular2-notifier': 'node_modules/angular2-notifier'
};
/** User packages configuration. */
var packages = {
    'angular2-notifier': {
        defaultExtension: 'js',
        main: 'index.js'
    },
    'immutable': {
        format: 'cjs'
    },
    '@angular2-material/core': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'core.js'
    },
    '@angular2-material/sidenav': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'sidenav.js'
    },
    '@angular2-material/checkbox': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'checkbox.js'
    },
    '@angular2-material/toolbar': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'toolbar.js'
    },
    '@angular2-material/progress-bar': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'progress-bar.js'
    },
    '@angular2-material/card': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'card.js'
    },
    '@angular2-material/button': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'button.js'
    },
    '@angular2-material/input': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'input.js'
    },
    '@angular2-material/list': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'list.js'
    },
    '@angular2-material/grid-list': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'grid-list.js'
    },
    '@angular2-material/icon': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'icon.js'
    },
    '@angular2-material/tabs': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'tabs.js'
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/forms',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
    'app/+addrate',
    'app/+dashboard',
    'app/+image-gallery',
    'app/+image-viewer',
    'app/+review',
    'app/+login',
    'app/+wishlist',
    'app/+register',
    'app/+user-profile',
    'app/+pre-register',
    'app/+post-register',
    'app/list-card',
    'app/detail-card',
    'app/hca-rangeinput',
    'app/hca-listitem',
    'app/image-carousel',
    'app/image-slide',
    'app/image-uploader',
    'app/autocomplete',
    'app/dash-stats',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map