const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    const [input, output] = _.split(line, ' => ');
    return {
      input,
      output
    }
  });
}

function gridToChunks(grid) {
  const chunks = [];
  const chunkSize = _.size(grid) % 2 === 0 ? 2 : 3;

  while (_.size(grid) > 0) {
    const slices = grid.splice(0, chunkSize);
    while (_.size(slices[0]) > 0) {
      const chunkPieces = [];
      _.each(slices, slice => {
        chunkPieces.push(slice.splice(0, chunkSize));
      });
      chunks.push(chunkPieces);
    }
  }

  return chunks;
}

function chunksToGrid(chunks) {
  chunks = _.map(chunks, square => {
    return _.map(_.split(square, '/'), line => {
      return _.split(line, '');
    });
  });

  const chunksPerLine = Math.sqrt(_.size(chunks));
  grid = [];

  while (_.size(chunks) > 0) {
    const slice = chunks.splice(0, chunksPerLine);
    grid = grid.concat(
      _.map(_.zip(...slice), arr => {
        return _.flatten(arr);
      })
    );
  }

  return grid;
}

function flattenGrid(grid) {
  return _.join(_.map(grid, row => {return _.join(row, '')}), '/');
}

function rotateGrid(grid) {
  const rotatedGrid = _.cloneDeep(grid);

  const maxIndex = _.size(grid) - 1;
  _.each(grid, (row, x) => {
    _.each(row, (value, y) => {
      rotatedGrid[y][maxIndex - x] = value;
    });
  });

  return rotatedGrid;
}

function getOutput(input, rules) {
  let grid = _.clone(input);
  const gridSize = _.size(grid);
  const gridVariants = [];

  // Get rotations and flips
  _.times(4, () => {
    gridVariants.push(flattenGrid(grid));
    const flippedX = _.map(grid, line => {return _.reverse(line)});
    gridVariants.push(flattenGrid(flippedX));
    const flippedY = _.reverse(grid);
    gridVariants.push(flattenGrid(flippedY));
    const flippedBoth = _.reverse(flippedX);
    gridVariants.push(flattenGrid(flippedBoth));
    grid = rotateGrid(grid);
  });

  const matchingRule = _.find(rules, rule => {
    return _.includes(gridVariants, rule.input);
  });

  return _.get(matchingRule, 'output', '');
}

function getNewGrid(grid, rules) {
  const chunks = gridToChunks(grid);
  const outputChunks = _.map(chunks, square => {
    return getOutput(square, rules);
  });
  return chunksToGrid(outputChunks);
}

exports.inputType = 'array';

exports.part1 = function(rawInput, iterations = 5) {
  const input = formatInput(rawInput);
  let grid = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
  ];

  _.times(iterations, () => {
    grid = getNewGrid(grid, input);
  });

  return _.size(_.filter(_.flatten(grid), elem => {return elem === '#'}));
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  let grid = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
  ];

  _.times(18, () => {
    grid = getNewGrid(grid, input);
  });

  return _.size(_.filter(_.flatten(grid), elem => {return elem === '#'}));
}
