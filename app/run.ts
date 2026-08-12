import {emitKeypressEvents} from 'node:readline';

import {randomDieValue, renderDice} from './dice.ts';
import config from './utils/config.ts';

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
  const options = process.stdout.columns === undefined ? {} : {maxWidth: process.stdout.columns};

  console.log(renderDice(values, config.dice.scale, options));
});
