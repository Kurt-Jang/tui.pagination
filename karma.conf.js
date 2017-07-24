
var pkg = require('./package.json');
var webpack = require('webpack');
var webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

function setConfig(defaultConfig, server) {
    if (server === 'ne') {
        defaultConfig.customLaunchers = {
            'IE8': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 8
            },
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 9
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 10
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 11
            },
            'Edge': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'MicrosoftEdge'
            },
            'Chrome-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome'
            },
            'Firefox-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox'
            }
        };
        defaultConfig.browsers = [
            'IE8',
            'IE9',
            'IE10',
            'IE11',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
        ];
        defaultConfig.reporters.push('coverage');
        defaultConfig.reporters.push('junit');
        defaultConfig.coverageReporter = {
            dir: 'report/coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir: function(browser) {
                        return 'report-html/' + browser;
                    }
                },
                {
                    type: 'cobertura',
                    subdir: function(browser) {
                        return 'report-cobertura/' + browser;
                    },
                    file: 'cobertura.txt'
                }
            ]
        };
        defaultConfig.junitReporter = {
            outputDir: 'report',
            suite: ''
        };
    } else {
        defaultConfig.browsers = [
            'Chrome'
        ];
    }
}

module.exports = function(config) {
    var defaultConfig = {
        basePath: './',
        frameworks: ['jquery-1.8.3', 'jasmine', 'es5-shim'],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        include: /src/,
                        exclude: /(bower_components|node_modules)/,
                        loader: 'eslint-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'style!css'
                    },
                    {
                        test: /\.png$/,
                        loader: 'url-loader'
                    }
                ]
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin()
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true
    };

    setConfig(defaultConfig, process.env.KARMA_SERVER);
    config.set(defaultConfig);
};
