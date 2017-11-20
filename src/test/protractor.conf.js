//jshint strict: false
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 11000,
    specs: [
        //'./components/textfieldTODO.protractor.js',
        './components/dropdown.protractor.js'
    ],
    capabilities: {
        browserName: 'firefox',
    },
    baseUrl: 'http://localhost:8000/',
    framework: 'mocha',
    mochaOpts: {
        reporter: "spec",
        slow: 3000
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
};