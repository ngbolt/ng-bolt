//jshint strict: false
exports.config = {
    allScriptsTimeout: 5000000,
    specs: [
        '*.js',
        'components/textfieldTODO.mocha.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:8000/',
    framework: 'mocha',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000000
    },
};