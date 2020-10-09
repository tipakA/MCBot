const { wait } = require('../util/util.js');

async function command(client, username, args) { /* eslint-disable-line no-unused-vars */
  clearInterval(client.intervals.get('timeSpent'));
  clearInterval(client.intervals.get('updateScoreboard'));
  client.emit('xTimeSpent');
  await wait(50);
  client.emit('xUpdateScoreboard');
}

module.exports = {
  info: {
    access: 'owner',
    name: 'stoptime',
  },
  run: command,
};