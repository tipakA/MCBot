const { promisify } = require('util');

module.exports.wait = promisify(setTimeout);