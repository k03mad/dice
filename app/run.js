#!/usr/bin/env node

import {emitKeypressEvents} from 'node:readline';

import {log} from '@k03mad/simple-log';
import chalk from 'chalk';
import {globby} from 'globby';
import image from 'terminal-image';

const {green, dim, bold} = chalk;

const getRandomArrElem = arr => arr[
    Math.floor(Math.random() * arr.length)
];

const DICE_PICTURES_PATH = 'app/png';
const DICE_HEIGHT = '30%';

const EXIT_KEY = 'q';

const texts = {
    message: green([
        '— enter any digit to generate this count of dices',
        '— press any key to repeat previous count generating',
        bold(`— press "CTRL+C" or enter "${EXIT_KEY}" to exit`),
    ].join('\n')),
    delimiter: dim('——————————————\n'),
};

const imgs = await globby(DICE_PICTURES_PATH);
log(texts.message);

let currentCount = 1;

emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on('keypress', async (str, key) => {
    if (
        (key.ctrl === true && key.name === 'c')
        || str === EXIT_KEY
    ) {
        process.exit();
    }

    const inputNum = Number(str);

    if (inputNum) {
        currentCount = inputNum;
    }

    log(texts.delimiter);

    for (let i = 0; i < currentCount; i++) {
        const img = await image.file(
            getRandomArrElem(imgs),
            {height: DICE_HEIGHT},
        );

        log(img);
    }
});
