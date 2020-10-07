const chalk = require('chalk');
const colors = require('../data/chatColors.json');

function log(data) {
  let output = '';
  const textData = data.extra || data.with;
  if (textData) {
    for (const part of textData) {
      output += chalk.hex(colors[part.color || 'white'])(part.text);
    }
  } else {
    output += data.text;
  }
  return output;
}

module.exports = log;