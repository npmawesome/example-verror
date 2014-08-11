'use strict';

var fs = require('fs');
var VError = require('verror');

exports.readConfig = function readConfig (file, callback) {
  function onRead (err, content) {
    if (err) {
      return callback(new VError(err, 'failed to read config file "%s"', file));
    }

    try {
      content = JSON.parse(content);
    } catch (e) {
      return callback(new VError(e, 'failed to parse config file "%s"', file));
    }

    callback(null, content);
  }

  fs.readFile(file, onRead);
};

if (require.main === module) {
  exports.readConfig('/not/available.json', function onRead (err, config) {
    if (err) {
      return console.error(err.message);
    }

    console.log(config);
  });
}