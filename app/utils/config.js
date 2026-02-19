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
        welcome: green(
            [
                '— type any digit to generate that number of dice',
                '— press any key to reroll dice',
                `— press ${bold('CTRL+C')} or type '${bold(EXIT_EXTRA_KEY)}' to exit`,
            ].join('\n'),
        ),
    },
};
