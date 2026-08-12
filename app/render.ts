import config from './config.ts';

const {pip, width, height, pips} = config.dice;

interface RenderOptions {
  readonly gap?: number;
  readonly maxWidth?: number;
}

const randomDieValue = (): number => Math.floor(Math.random() * 6) + 1;

const die = (value: number): string => {
  const pipsForValue = pips[value];

  if (pipsForValue === undefined) {
    throw new Error(`Invalid die value: ${value}`);
  }

  const cellWidth = (width - 2) / 3;
  const cellHeight = (height - 2) / 3;

  const grid = Array.from({length: height}, () => Array.from({length: width}, () => ' '));

  const put = (x: number, y: number, ch: string): void => {
    const row = grid[y];

    if (row !== undefined) {
      row[x] = ch;
    }
  };

  for (let x = 0; x < width; x++) {
    put(x, 0, '─');
    put(x, height - 1, '─');
  }

  for (let y = 0; y < height; y++) {
    put(0, y, '│');
    put(width - 1, y, '│');
  }

  put(0, 0, '┌');
  put(width - 1, 0, '┐');
  put(0, height - 1, '└');
  put(width - 1, height - 1, '┘');

  for (const [row, col] of pipsForValue) {
    put(
      1 + col * cellWidth + Math.floor(cellWidth / 2),
      1 + row * cellHeight + Math.floor(cellHeight / 2),
      pip,
    );
  }

  return grid.map(line => line.join('')).join('\n');
};

const renderDice = (values: readonly number[], options: RenderOptions = {}): string => {
  const {gap = config.dice.gap, maxWidth} = options;

  const faces = values.map(value => die(value).split('\n'));

  const firstFace = faces[0];

  if (firstFace === undefined) {
    return '';
  }

  const dieWidth = firstFace[0]?.length ?? 0;
  const rowWidth = dieWidth * faces.length + gap * (faces.length - 1);
  const joiner = maxWidth !== undefined && rowWidth > maxWidth ? '\n' : ' '.repeat(gap);

  return firstFace
    .map((_, rowIndex) => faces.map(face => face[rowIndex] ?? '').join(joiner))
    .join('\n');
};

export default (count: number, options: RenderOptions = {}): string =>
  renderDice(Array.from({length: count}, randomDieValue), options);
