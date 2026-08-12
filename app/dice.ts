const PIP = '●';

const PIPS: Record<number, readonly (readonly [number, number])[]> = {
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
};

const die = (value: number, scale: number): string => {
  const pips = PIPS[value];

  if (pips === undefined) {
    throw new Error(`Invalid die value: ${value}`);
  }

  const cellWidth = 2 * scale + 1;
  const width = 3 * cellWidth + 2;
  const height = 3 * cellWidth + 2;

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

  for (const [row, col] of pips) {
    put(
      1 + col * cellWidth + Math.floor(cellWidth / 2),
      1 + row * cellWidth + Math.floor(cellWidth / 2),
      PIP,
    );
  }

  return grid.map(line => line.join('')).join('\n');
};

export interface DiceRenderOptions {
  readonly gap?: number;
  readonly maxWidth?: number;
}

export const renderDice = (
  values: readonly number[],
  scale: number,
  options: DiceRenderOptions = {},
): string => {
  const {gap = 2, maxWidth} = options;

  const faces = values.map(value => die(value, scale).split('\n'));

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

export const randomDieValue = (): number => Math.floor(Math.random() * 6) + 1;
