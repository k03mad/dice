import chalk from 'chalk';

const {green, dim, bold} = chalk;

const EXIT_EXTRA_KEY = 'q';

export default {
  dice: {
    defaultCount: 1,
    gap: 2,
    pip: '●',
    width: 11,
    height: 5,
    pips: {
      1: [[1, 1]],
      2: [
        [0, 0],
        [2, 2],
      ],
      3: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      4: [
        [0, 0],
        [2, 0],
        [0, 2],
        [2, 2],
      ],
      5: [
        [0, 0],
        [2, 0],
        [1, 1],
        [0, 2],
        [2, 2],
      ],
      6: [
        [0, 0],
        [2, 0],
        [1, 0],
        [1, 2],
        [0, 2],
        [2, 2],
      ],
    } as Record<number, readonly (readonly [number, number])[]>,
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
