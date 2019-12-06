/* eslint-disable global-require, no-inline-comments */
const Collection = require('@discordjs/collection');
const { readdir } = require('fs');
const { promisify } = require('util');
const read = promisify(readdir);

const commands = new Collection();

async function loader(client, loadAll = true, command) {
  if (!loadAll && !command) return Error('loadAll was set to false, but no command was specified');
  const commandList = await read('../commands/');
  if (loadAll) {
    for (const cmdName of commandList) {
      try {
        const cmd = require(`../commands/${cmdName}`);
        commands.set(cmd.info.name, cmd.run);
        console.log(cmd.info.name, 'loaded'); // TODO Rewrite logger to allow human readable format, eventually split on 2 loggers.
      } catch (err) {
        client.log({ extra: [{ color: 'dark_red', text: 'ERROR' }, { color: 'red', text: `Error while loading command ${cmdName}: ${err.message}` }] });
      }
    }
    return commands;
  }
}

module.exports = loader;