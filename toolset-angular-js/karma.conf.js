const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts'
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript']
    },
    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter'
    ],
    reporters: ['kjhtml', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.spec.json"
    },
    client: {
      clearContext: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
