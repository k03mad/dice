#!/usr/bin/env node

import {emitKeypressEvents} from 'node:readline';

import {log} from '@k03mad/simple-log';
import {globby} from 'globby';
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

const imgs = await globby(DICE_PICTURES_PATH);

emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

let diceCurrentCount = DICE_DEFAULT_COUNT;
log(texts.message);

process.stdin.on('keypress', async (char, key) => {
    log(texts.delimiter);

    if (
        (key.ctrl === true && key.name === EXIT_CTRL_MODIFIER)
        || char === EXIT_EXTRA_KEY
    ) {
        process.exit();
    }

    diceCurrentCount = Number(char) || diceCurrentCount;

    const output = await Promise.all(
        Array.from({length: diceCurrentCount}, () => {
            const diceImg = getRandomArrElem(imgs);
            return image.file(diceImg, {height: DICE_HEIGHT});
        }),
    );

    log(output);
});
