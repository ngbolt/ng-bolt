//jshint strict: false
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '*.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:8000/',
    framework: 'mocha',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};