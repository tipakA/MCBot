async function event(client, player) { /* eslint-disable-line no-unused-vars */
  if (!client.trackingEnabled) return;
  if (player.username === client.config.nickname) return;

  const data = client.onlinePlayers.get(player.username);
  const diff = Date.now() - data.lastCheck;
  let offset = diff % 1000;

  data.time += diff;

  let toAdd = diff;

  if (offset >= 1000) {
    toAdd += 1000;
    offset -= 1000;
  }

  await client.redis.set(`mc:playertime:${player.username}`, data.time);
  client.onlinePlayers.delete(player.username);

  client.emit('xUpdateScoreboard');
  client.intervals.get('updateScoreboard').refresh();
  // client.chat(`/scoreboard players add ${player.username} timespent ${Math.floor(toAdd / 1000)}`);
}

module.exports = {
  info: {
    name: 'playerLeft',
  },
  run: event,
};