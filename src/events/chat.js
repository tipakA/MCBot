function event(client, username, message, translate, raw) { /* eslint-disable-line no-unused-vars */
  if (username === client.username) return;
  // Console.log(`${username}: ${message} || ${raw}`);
  console.log(message);
  console.log(translate);
}

module.exports = {
  info: {
    name: 'chat',
  },
  run: event,
};