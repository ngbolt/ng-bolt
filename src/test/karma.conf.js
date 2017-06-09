module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            // Dependencies
            '../node_modules/angular/angular.js',
            '../node_modules/angular-route/angular-route.js',
            '../node_modules/angular-mocks/angular-mocks.js',

            // Load Definitions
            // NOTE: These Must Load First
            'core/js/ng-bolt.js',
            'core/js/core.module.js',
            'components/datepicker/datepicker.module.js',
            'components/view/view.module.js',

            // Load All Other Files
            'core/js/**.js',
            'components/**/*.js',

            // Load Templates
            'components/**/*.template.html',

            // Load Tests
            'test/**/**.mocha.js'
        ],
        exclude: [
            // JSDoc Files
            'core/**/*.jsdoc.js',
            'components/**/*.jsdoc.js'
        ],
        autoWatch: true,
        frameworks: ['mocha', 'sinon-chai'],
        browsers: ['Chrome'],
        client: {
            mocha: {
                reporter: 'html'
            }
        },
        preprocessors: {
            'components/**/*.template.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-ng-html2js-preprocessor'
        ]
    });
};