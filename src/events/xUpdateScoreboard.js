async function event(client) { /* eslint-disable-line no-unused-vars */
  const keys = await client.redis.keys('mc:playertime:*');
  for (const key of keys) {
    const nickname = key.split(':')[2];
    if (nickname === client.config.nickname) continue;
    const time = await client.redis.get(key);

    client.chat(`/scoreboard players set ${nickname} timespent ${Math.floor(parseInt(time) / 1000)}`);
  }
}

module.exports = {
  info: {
    name: 'xUpdateScoreboard',
  },
  run: event,
};