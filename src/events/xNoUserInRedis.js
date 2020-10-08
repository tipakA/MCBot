async function event(client, data) { /* eslint-disable-line no-unused-vars */
  await client.redis.set(`mc:playertime:${data.username}`, 0);
}

module.exports = {
  info: {
    name: 'xNoUserInRedis',
  },
  run: event,
};