const chalk = require('chalk');
const colors = require('../data/chatColors.json');

function log(data) {
  let output = '';
  let textData = data.extra;
  if (!textData) textData = data.with;
  for (const part of textData) {
    output += chalk.hex(colors[part.color || 'white'])(part.text);
  }
  return output;
}

module.exports = log;