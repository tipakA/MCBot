async function stopCommand(client, username, args) { /* eslint-disable-line no-unused-vars */
  if (username !== 'tipakA') return client.whisper(username, 'You do not have access to this command.');
  client.whisper(username, 'Shutting down...');
  await client.p('quit')('Process stopped');
  return process.exit(0);
}

module.exports = {
  info: {
    access: 'owner',
    name: 'stop',
  },
  run: stopCommand,
};