function command(client, username, args) { /* eslint-disable-line no-unused-vars */
  client.startPoint = Date.now();
  client.currentSidebar = 'timespent';
  client.chat('/scoreboard objectives setdisplay sidebar timespent');

  client.intervals.set('timeSpent', setInterval(() => client.emit('xTimeSpent'), 5000));
  client.intervals.set('updateScoreboard', setInterval(() => client.emit('xUpdateScoreboard'), 900000));
  client.intervals.set('changeSidebar', setInterval(() => client.emit('xChangeSidebar'), 300000));
}

module.exports = {
  info: {
    access: 'owner',
    name: 'starttime',
  },
  run: command,
};