function event(client) { /* eslint-disable-line no-unused-vars */
  console.log(`Logged in as ${client.username}`);
}

module.exports = {
  info: {
    name: 'login',
  },
  run: event,
};