function event(client, error) { /* eslint-disable-line no-unused-vars */
  console.error(error);
}

module.exports = {
  info: {
    name: 'error',
  },
  run: event,
};