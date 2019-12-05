const chalk = require('chalk');

/* eslint-disable camelcase */
const colors = {
  aqua: '55FFFF',
  black: '#000000',
  blue: '#5555FF',
  dark_aqua: '#00AAAA',
  dark_blue: '#0000AA',
  dark_gray: '#555555',
  dark_green: '#00AA00',
  dark_purple: '#AA00AA',
  dark_red: '#AA0000',
  default: '#ffffff',
  gold: '#FFAA00',
  gray: '#AAAAAA',
  green: '#55FF55',
  light_purple: '#FF55FF',
  red: '#FF5555',
  white: '#FFFFFF',
  yellow: '#FFFF55',
};
/* eslint-enable camelcase */

function log(data) {
  let output = '';
  for (const part of data.extra) {
    output += `${chalk.hex(colors[part.color || 'default'])(part.text)}`;
  }
  return output;
}

module.exports = log;