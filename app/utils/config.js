import chalk from 'chalk';

const {green, dim, bold} = chalk;

export const DICE_DEFAULT_COUNT = 1;
export const DICE_PICTURES_PATH = 'app/png';
export const DICE_HEIGHT = '30%';

export const EXIT_CTRL_MODIFIER = 'c';
export const EXIT_EXTRA_KEY = 'q';

export const texts = {
    message: green([
        '— enter any digit to generate this count of dices',
        '— press any key to repeat previous count generating',
        bold(`— press "CTRL+C" or enter "${EXIT_EXTRA_KEY}" to exit`),
    ].join('\n')),
    delimiter: dim('——————————————\n'),
};
