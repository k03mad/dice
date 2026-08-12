import {emitKeypressEvents} from 'node:readline';

import config from './config.ts';
import render from './render.ts';

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

  const options = process.stdout.columns === undefined ? {} : {maxWidth: process.stdout.columns};

  console.log(render(diceCurrentCount, options));
});
