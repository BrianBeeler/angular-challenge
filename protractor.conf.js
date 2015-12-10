'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js']
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'chrome',
    chromeOnly: true
  };
}

exports.config = config;
