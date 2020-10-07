function event(client, username, message) { /* eslint-disable-line no-unused-vars */
  if (username === client.username) return;
  console.log(`${username} whispers: ${message}`);

  if (!client.config.access.includes(username)) return;
  if (!message.startsWith(client.config.prefix)) return;

  const args = message.slice(client.config.prefix.length).split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
  if (!command) return;

  if (command.info.access && command.info.access === 'owner' && username !== client.config.access[0]) return client.whisper(username, 'This command is owner only.');

  command.run(client, username, args);
}

module.exports = {
  info: {
    name: 'whisper',
  },
  run: event,
};