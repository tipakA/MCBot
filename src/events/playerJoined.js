async function event(client, player) { /* eslint-disable-line no-unused-vars */
  if (!client.trackingEnabled) return;
  if (player.username === client.config.nickname) return;

  const data = player;
  const redisPlayerTime = await client.redis.get(`mc:playertime:${player.username}`);
  if (!redisPlayerTime) client.emit('xNoUserInRedis', data);

  data.time = Number(redisPlayerTime) || 0;
  data.lastCheck = Date.now();
  data.offset = data.time % 1000;
  client.onlinePlayers.set(player.username, data);
}

module.exports = {
  info: {
    name: 'playerJoined',
  },
  run: event,
};