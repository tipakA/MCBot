async function event(client, playerData) { /* eslint-disable-line no-unused-vars */
  if (!client.trackingEnabled) return;
  const times = [];
  if (!playerData) {
    for (const [ nickname, data ] of client.onlinePlayers) {
      if (nickname === client.config.nickname) continue;
      const diff = Date.now() - data.lastCheck; // ~10s
      const offset = diff % 1000; // rest of millis from diff

      console.log('initial diff', diff);
      console.log('initial offset', offset);
      console.log('initial data.time', data.time);

      data.time += diff; // adding the diff to time on object
      data.lastCheck = Date.now(); // storing now for future diff

      let toAdd = diff; // separate var for diff to not touch time passed

      data.offset = (data.offset || 0) + offset; // add new offset to other offsets
      if (data.offset >= 1000) { // if rest of millis adds up to a second
        console.log('subtracted 1s');
        toAdd += 1000; // add that second to diff
        data.offset -= 1000; // subtract that second from sum of offsets
      }

      console.log('new data.offset', data.offset);
      console.log('toAdd', toAdd);
      console.log('calculated', Math.floor(toAdd / 1000));
      console.log('---');

      client.onlinePlayers.set(nickname, data);
      await client.redis.set(`mc:playertime:${nickname}`, data.time); // store accurate time in redis
      times.push({ nickname, time: Math.floor(toAdd / 1000), raw: { offset: data.offset, diff } }); // push to array of commands time floored to seconds
    }
  }

  for (const time of times) {
    //if (time.nickname === 'tipakA') client.chat(`Diff: ${time.raw.diff}, offset: ${time.raw.offset}`);
    client.chat(`/scoreboard players add ${time.nickname} timespent ${time.time}`);
  }
  console.log('=======');
}

module.exports = {
  info: {
    name: 'xTimeSpent',
  },
  run: event,
};