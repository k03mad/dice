#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import {emitKeypressEvents} from 'node:readline';

import {log} from '@k03mad/simple-log';
import image from 'terminal-image';

import {
    DICE_DEFAULT_COUNT,
    DICE_HEIGHT,
    DICE_PICTURES_PATH,
    EXIT_CTRL_MODIFIER,
    EXIT_EXTRA_KEY,
    texts,
} from './utils/config.js';
import {getRandomArrElem} from './utils/helpers.js';

const imgFiles = await fs.readdir(DICE_PICTURES_PATH);
const imgPaths = imgFiles.map(img => path.join(process.cwd(), DICE_PICTURES_PATH, img));

emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

let diceCurrentCount = DICE_DEFAULT_COUNT;
log(texts.message);

process.stdin.on('keypress', async (char, key) => {
    if (
        (key.ctrl === true && key.name === EXIT_CTRL_MODIFIER)
        || char === EXIT_EXTRA_KEY
    ) {
        process.exit();
    } else {
        log(texts.delimiter);
    }

    diceCurrentCount = Number(char) || diceCurrentCount;

    const output = await Promise.all(
        Array.from({length: diceCurrentCount}, () => {
            const diceImg = getRandomArrElem(imgPaths);
            return image.file(diceImg, {height: DICE_HEIGHT});
        }),
    );

    log(output);
});
