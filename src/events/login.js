async function event(client) { /* eslint-disable-line no-unused-vars */
  console.log(`Logged in as ${client.username}`);

  const redistest = await client.redis.keys('*');
  if (!redistest.length) return console.error('Error while connecting to redis.');
  console.log(`${redistest.length} keys in Redis`);

  for (const data of Object.values(client.players)) {
    const redisPlayerTime = await client.redis.get(`mc:playertime:${data.username}`);
    if (!redisPlayerTime) client.emit('xNoUserInRedis', data);
    data.time = Number(redisPlayerTime) || 0;
    data.lastCheck = Date.now();
    client.onlinePlayers.set(data.username, data);
  }
}

module.exports = {
  info: {
    name: 'login',
  },
  run: event,
};