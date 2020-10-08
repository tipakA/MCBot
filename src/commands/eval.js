const { inspect } = require('util');

async function stopCommand(client, username, args) { /* eslint-disable-line no-unused-vars */
  const evaled = await eval(args.join(' '));
  return client.whisper(username, inspect(evaled, { depth: 0 }));
}

module.exports = {
  info: {
    access: 'owner',
    name: 'eval',
  },
  run: stopCommand,
};