const mineflayer = require('mineflayer');
const { promisify: prom } = require('util');
const version = '1.12.2';
const mcdata = require('minecraft-data')(version);
const item = require('prismarine-item')(version);
require('dotenv').config();

const botAccess = ['tipakA'];
const prefix = '!';

const client = mineflayer.createBot({
  host: process.env.HOST,
  port: process.env.HOST_PORT,
  username: 'tipakBot',
  version,
});

client.log = require('./util/logger.js');
client.p = func => prom(client[func]);

client.on('login', async () => {
  console.log(`Logged in as ${client.username}`);
  client.commands = await require('./util/commandLoader.js')(client);
});

client.on('chat', (username, message, _, raw) => {
  if (username === client.username) return;
  console.log(`${username}: ${message} || ${raw}`);
});

client.on('whisper', async (username, message) => {
  if (username === client.username) return;
  console.log(`${username} whispers: ${message}`);

  if (!botAccess.includes(username)) return;
  if (!message.startsWith(prefix)) return;

  const args = message.slice(prefix.length).split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
  if (!command) return;

  if (command.info.access && command.info.access === 'owner' && username !== botAccess[0]) return client.whisper(username, 'Ta komanda jest tylko dla właściciela.');

  client.commands.get(command).run(client, username, args);
});

client.on('message', raw => {
  console.log('Raw message:', raw);
  console.log('Raw message:', client.log(raw));
});

client.on('error', console.error);

client.on('spawn', () => console.log('Spawn'));