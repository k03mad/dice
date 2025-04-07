#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import {emitKeypressEvents} from 'node:readline';

import image from 'terminal-image';

import config from './utils/config.js';
import {getRandomArrElem} from './utils/helpers.js';

const imgFolderAbs = path.join(import.meta.dirname, config.dice.picturesFolder);

const imgFiles = await fs.readdir(imgFolderAbs);
const imgFilesAbs = imgFiles.map(img => path.join(imgFolderAbs, img));

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let diceCurrentCount = config.dice.defaultCount;
console.log(config.messages.welcome);

process.stdin.on('keypress', async (char, key) => {
    if (
        (key.ctrl === true && key.name === config.exit.ctrlKeyModifier)
        || char === config.exit.extraKey
    ) {
        process.exit();
    } else {
        console.log(config.dice.separator);
    }

    diceCurrentCount = Number(char) || diceCurrentCount;

    const output = await Promise.all(
        Array.from({length: diceCurrentCount}, () => {
            const diceImg = getRandomArrElem(imgFilesAbs);
            return image.file(diceImg, {height: config.dice.height});
        }),
    );

    console.log(output.join('\n'));
});
