/* eslint-disable sort-keys, global-require */
const mineflayer = require('mineflayer');
const { promisify: prom } = require('util');

const config = require('./util/config.js');

const mcdata = require('minecraft-data')(config.version); /* eslint-disable-line no-unused-vars */
const item = require('prismarine-item')(config.version); /* eslint-disable-line no-unused-vars */
const AutoAuth = require('mineflayer-auto-auth');
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
  client.log = require('./util/logger.js');
  client.p = func => prom(client[func]);
  client.commands = await require('./util/commandLoader.js')(client); /* eslint-disable-line require-atomic-updates */
  client.events = await require('./util/eventLoader.js')(client); /* eslint-disable-line require-atomic-updates */
}

main();