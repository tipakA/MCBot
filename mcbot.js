const mineflayer = require('mineflayer');
const version = '1.12.2';
const mcdata = require('minecraft-data')(version);
const item = require('prismarine-item')(version);
require('dotenv').config();
const client = mineflayer.createBot({
  host: process.env.HOST,
  port: process.env.HOST_PORT,
  username: 'tipakBot',
  version,
});

client.on('login', () => {
  console.log(`Logged in as ${client.username}`);
});

client.on('chat', (username, message, _, raw) => {
  if (username === client.username) return;
  console.log(`${username}: ${message} || ${raw}`);
});

client.on('whisper', (username, message) => {
  if (username === client.username) return;
  console.log(`${username} whispers: ${message}`);
});

client.on('message', raw => {
  console.log('Raw message:', raw);
});

client.on('error', console.error);

client.on('spawn', () => console.log('Spawn'));