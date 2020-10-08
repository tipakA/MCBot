const { inspect } = require('util');

function event(client, raw) { /* eslint-disable-line no-unused-vars */
  // console.log(inspect(raw.extra, { depth: 1 }));
}

module.exports = {
  info: {
    name: 'message',
  },
  run: event,
};