/* eslint-disable global-require, no-inline-comments */
const { readdir } = require('fs');
const { promisify } = require('util');
const read = promisify(readdir);

const events = [];

async function loader(client, loadAll = true, event) {
  if (!loadAll && !event) return Error('loadAll was set to false, but no event was specified');
  const eventList = await read('./src/events/').then(files => files.filter(f => f.endsWith('.js')));
  if (loadAll) {
    for (const evtName of eventList) {
      console.log(`Loading ${eventList.length} events...`);
      try {
        const evt = require(`../events/${evtName}`);
        client.on(evt.info.name, evt.run.bind(null, client));
        events.push({ f: evt.run, name: evt.info.name });
        console.log('Event', evt.info.name, 'loaded'); // TODO Rewrite logger to allow human readable format, eventually split on 2 loggers.
      } catch (err) {
        client.log({ extra: [{ color: 'dark_red', text: 'ERROR' }, { color: 'red', text: `Error while loading command ${cmdName}: ${err.message}` }] });
      }
    }
    return events;
  }
}

module.exports = loader;