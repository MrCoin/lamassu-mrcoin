'use strict';

var _ = require('lodash');

exports.NAME = 'MrCoin';
exports.SUPPORTED_MODULES = ['ticker'];

exports.config = function config(localConfig) {
  if (localConfig) _.merge(exports, localConfig);
};
