async function event(client, playerData) { /* eslint-disable-line no-unused-vars */
  if (!client.trackingEnabled) return;

  let firstCheck = false;

  let time = Date.now();
  if (client.startPoint) {
    time = client.startPoint;
    firstCheck = true;
    client.startPoint = null;
  }

  if (!playerData) {
    for (const [ nickname, data ] of client.onlinePlayers) {
      if (nickname === client.config.nickname) continue;
      const diff = time - firstCheck ? Date.now() : data.lastCheck; // ~10s
      const offset = diff % 1000; // rest of millis from diff

      data.time += diff; // adding the diff to time on object
      data.lastCheck = Date.now(); // storing now for future diff

      let toAdd = diff; // separate var for diff to not touch time passed

      data.offset = (data.offset || 0) + offset; // add new offset to other offsets
      if (data.offset >= 1000) { // if rest of millis adds up to a second
        toAdd += 1000; // add that second to diff
        data.offset -= 1000; // subtract that second from sum of offsets
      }

      client.onlineCache.add(nickname);
      client.onlinePlayers.set(nickname, data);
      await client.redis.set(`mc:playertime:${nickname}`, data.time); // store accurate time in redis
    }
  }
}

module.exports = {
  info: {
    name: 'xTimeSpent',
  },
  run: event,
};