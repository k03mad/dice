import {emitKeypressEvents} from 'node:readline';

import chalk from 'chalk';

import {randomDieValue, renderDice} from './dice.ts';

const {green, dim, bold} = chalk;

const EXIT_EXTRA_KEY = 'q';

const config = {
  dice: {
    defaultCount: 1,
    gap: 2,
    separator: dim('>\n'),
  },

  exit: {
    ctrlKeyModifier: 'c',
    extraKey: EXIT_EXTRA_KEY,
  },

  messages: {
    welcome: green(
      [
        '— type any digit to generate that number of dice',
        '— press any key to reroll dice',
        `— press ${bold('CTRL+C')} or type '${bold(EXIT_EXTRA_KEY)}' to exit`,
      ].join('\n'),
    ),
  },
} as const;

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let diceCurrentCount: number = config.dice.defaultCount;
console.log(config.messages.welcome);

process.stdin.on('keypress', (char: string, key: {ctrl: boolean; name: string}) => {
  if (
    (key.ctrl === true && key.name === config.exit.ctrlKeyModifier) ||
    char === config.exit.extraKey
  ) {
    process.exit();
  } else {
    console.log(config.dice.separator);
  }

  diceCurrentCount = Number(char) || diceCurrentCount;

  const values = Array.from({length: diceCurrentCount}, randomDieValue);

  const options =
    process.stdout.columns === undefined
      ? {}
      : {gap: config.dice.gap, maxWidth: process.stdout.columns};

  console.log(renderDice(values, options));
});
