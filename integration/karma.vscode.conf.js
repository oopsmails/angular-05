// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular/cli'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        // require('karma-ie-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular/cli/plugins/karma')
      ],
      client: {
        clearContext: false, // leave Jasmine Spec Runner output visible in browser,
        useIframe: false
      },
      files: [
        { pattern: './lib/test.ts', watched: false }
      ],
      preprocessors: {
        './lib/test.ts': ['@angular/cli']
      },
      mime: {
        'text/x-typescript': ['ts', 'tsx']
      },
      coverageIstanbulReporter: {
        reports: [],
        fixWebpackSourcePaths: true
      },
      angularCli: {
        environment: 'dev'
      },
      reporters: config.angularCli && config.angularCli.codeCoverage
                ? ['progress', 'coverage-istanbul']
                : ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['ChromeHeadless']
      ,
      customLaunchers: {
        Chrome_with_debugging: {
          base: 'Chrome',
          flags: [
            '--disable-gpu',
            '--remote-debugging-port=9222'
          ],
          debug: true
        }
      }
    });
  };
  