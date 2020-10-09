function event(client, data) { /* eslint-disable-line no-unused-vars */
  if (client.currentSidebar === 'timespent') {
    client.currentSidebar = 'deaths';
    client.chat('/scoreboard objectives setdisplay sidebar deaths');
  } else if (client.currentSidebar === 'deaths') {
    client.currentSidebar = 'timespent';
    client.chat('/scoreboard objectives setdisplay sidebar timespent');
  }
}

module.exports = {
  info: {
    name: 'xChangeSidebar',
  },
  run: event,
};