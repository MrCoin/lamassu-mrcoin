'use strict';

var Wreck  = require('wreck');
var config = require('../config');

exports.ticker = function ticker(currencies, callback) {
  if (typeof currencies === 'string')
    currencies = [currencies];

  if (currencies.length !== 1 || currencies[0] !== 'HUF') {
    return callback('Only HUF is currently supported');
  }

  var headers = {
    'User-Agent': 'Mozilla/4.0 (compatible; Lamassu)'
  };

  if (! config.ticker_url)
  return callback(new Error('Please set the ticker_url config variable'));

  Wreck.get(config.ticker_url, {headers: headers, json: true}, function(err, res, payload) {
    if (err) return callback(err);

    if (payload.message) return callback(new Error(payload.message));

    if (! payload.atm_ticker.BTCHUF.valid) return callback(new Error("Price ticker is not valid"));

    var result = {
      HUF: {
        currency: 'HUF',
        rates: {
          ask: parseFloat(payload.atm_ticker.BTCHUF.ask),
          bid: parseFloat(payload.atm_ticker.BTCHUF.bid)
        }
      }
    };
    callback(null, result);
  });
};
