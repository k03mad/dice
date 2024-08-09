import chalk from 'chalk';

const {green, dim, bold} = chalk;

const EXIT_EXTRA_KEY = 'q';

export default {
    dice: {
        defaultCount: 1,
        picturesFolder: 'png',
        height: '30%',
        separator: dim('>\n'),
    },

    exit: {
        ctrlKeyModifier: 'c',
        extraKey: EXIT_EXTRA_KEY,
    },

    messages: {
        welcome: green([
            '— enter any digit to generate that number of dice',
            '— press any key to repeat the previous count generation',
            `— press ${bold('CTRL+C')} or enter '${bold(EXIT_EXTRA_KEY)}' to exit`,
        ].join('\n')),
    },
};
