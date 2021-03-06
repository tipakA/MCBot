const { wait } = require('../util/util.js');

async function command(client, username, args) { /* eslint-disable-line no-unused-vars */
  // const nicknames = client.onlinePlayers.map(player => player.username);

  for (let i = 0; i !== 4; i++) client.chat(`/team add team${i} "Team ${i}"`);
  await wait(50);
  for (let i = 0; i !== 4; i++) client.chat(`/team modify team${i} prefix "[Team ${i}] "`);
  client.chat('/team join team1 didinele');
  client.chat('/team join team1 Astronomy');
  client.chat('/team join team2 itsUrcute');
  client.chat('/team join team2 Not_Sugden');
  client.chat('/team join team3 tipakA');
  client.chat('/team join team3 KatieTheKytten');

  client.chat('/scoreboard objectives add deaths deathCount "Death count"');
  client.chat('/scoreboard objectives add timespent dummy "Time spent"');
  await wait(50);

  client.chat('/scoreboard players set @a deaths 0');
  client.chat('/scoreboard players set @a timespent 0');
  await wait(50);
  client.chat(`/scoreboard players reset ${client.config.nickname} deaths`);
  client.chat(`/scoreboard players reset ${client.config.nickname} timespent`);

  client.chat(`/gamemode spectator ${client.config.nickname}`);

  client.trackingEnabled = true;
}

module.exports = {
  info: {
    access: 'owner',
    name: 'prepare',
  },
  run: command,
};