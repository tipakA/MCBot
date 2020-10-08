function command(client, username, args) { /* eslint-disable-line no-unused-vars */
  // const nicknames = client.onlinePlayers.map(player => player.username);

  for (let i = 0; i !== 4; i++) client.chat(`/team add team${i} "Team ${i}"`);
  for (let i = 0; i !== 4; i++) client.chat(`/team modify team${i} prefix "[Team ${i}] "`);
  client.chat('/team join team1 didinele');
  client.chat('/team join team1 Astronomy');
  client.chat('/team join team2 itsUrcute');
  client.chat('/team join team2 Not_Sugden');
  client.chat('/team join team3 tipakA');
  client.chat('/team join team3 KatieTheKytten');

  client.chat('/scoreboard objectives add deaths deathCount "Death count"');
  client.chat('/scoreboard objectives add timespent dummy "Time spent"');
  client.chat('/scoreboard objectives setdisplay sidebar timespent');

  client.chat('/scoreboard players set @a deaths 0');
  client.chat('/scoreboard players set @a timespent 0');

  client.trackingEnabled = true;
}

module.exports = {
  info: {
    access: 'owner',
    name: 'prepare',
  },
  run: command,
};