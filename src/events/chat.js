function event(client, username, message, _, raw) { /* eslint-disable-line no-unused-vars */
  if (username === client.username) return;
  // Console.log(`${username}: ${message} || ${raw}`);
  console.log(raw);
}

module.exports = {
  info: {
    name: 'chat',
  },
  run: event,
};