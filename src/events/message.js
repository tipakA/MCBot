function event(client, raw) { /* eslint-disable-line no-unused-vars */
  console.log('Raw message:', raw);
}

module.exports = {
  info: {
    name: 'message',
  },
  run: event,
};