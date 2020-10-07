async function event(client) { /* eslint-disable-line no-unused-vars */
  console.log(`Logged in as ${client.username}`);
  const redistest = await client.redis.keys('*');
  if (!redistest.length) return console.error('Error while connecting to redis.');
  console.log(`${redistest.length} keys in Redis`);
}

module.exports = {
  info: {
    name: 'login',
  },
  run: event,
};