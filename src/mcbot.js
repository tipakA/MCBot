/* eslint-disable sort-keys, global-require */
const mineflayer = require('mineflayer');
const Redis = require('ioredis');
const AutoAuth = require('mineflayer-auto-auth');
const Collection = require('@discordjs/collection');
const { promisify: prom } = require('util');

const config = require('./util/config.js');

const mcdata = require('minecraft-data')(config.version); /* eslint-disable-line no-unused-vars */
const item = require('prismarine-item')(config.version); /* eslint-disable-line no-unused-vars */
require('dotenv').config();

const client = mineflayer.createBot({
  host: config.server.address,
  port: config.server.port,
  username: config.nickname,
  version: config.version,

  plugins: [AutoAuth],
  AutoAuth: process.env.PASSWORD,
});

async function main() {
  client.config = config;
  client.trackingEnabled = true;

  client.onlinePlayers = new Collection();
  client.intervals = new Collection();

  client.onlinePlayers.set(config.nickname, { username: config.nickname });
  client.intervals.set('timeSpent', setInterval(() => client.emit('xTimeSpent'), 5000));
  client.intervals.set('updateScoreboard', setInterval(() => client.emit('xUpdateScoreboard'), 900000));

  client.redis = new Redis();
  client.p = func => prom(client[func]);

  client.log = require('./util/logger.js');
  client.commands = await require('./util/commandLoader.js')(client); /* eslint-disable-line require-atomic-updates */
  client.events = await require('./util/eventLoader.js')(client); /* eslint-disable-line require-atomic-updates */
}

main();