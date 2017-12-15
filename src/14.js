const _ = require('lodash');
const { part2: getHash } = require('./10.js');

function getGrid(input, numeric) {
  const grid = [];

  _.times(128, index => {
    let hashBits = [];
    const hash = getHash(`${input}-${index}`);

    _.each(_.split(hash, ''), char => {
      let bits = _.split(_.padStart(parseInt(char, 16).toString(2), 4, 0), '');
      if (numeric) {
        bits = _.map(bits, bit => { return parseInt(bit) });
      } else {
        bits = _.map(bits, bit => { return bit === '1' ? '#' : '.' });
      }
      hashBits = _.concat(hashBits, bits);
    });

    grid.push(hashBits);
  });

  return grid;
}

function markRegion(grid, regionLabel, region = []) {
  let newGrid = _.cloneDeep(grid);
  let gridUpdated = false;

  if (!_.includes(_.flatten(grid), regionLabel)) {
    // Mark first square of region
    _.each(newGrid, (row, rowIndex) => {
      if (_.includes(row, '#')) {
        const columnIndex = row.indexOf('#');
        row[columnIndex] = regionLabel;
        region.push([rowIndex, columnIndex]);
        gridUpdated = true;
        return false;
      }
    });

  } else {
    // Mark adjacent squares
    _.each(region, ([row, column]) => {
      const adjacentSquares = [
        [row - 1, column],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column]
      ];

      _.each(adjacentSquares, ([adjRow, adjColumn]) => {
        if (_.get(newGrid, `[${adjRow}][${adjColumn}]`) === '#') {
          newGrid[adjRow][adjColumn] = regionLabel;
          region.push([adjRow, adjColumn]);
          gridUpdated = true;
        }
      });
    });
  }

  if (gridUpdated) {
    newGrid = markRegion(newGrid, regionLabel, region);
  }

  return newGrid;
}

exports.inputType = 'string';

exports.part1 = function(input) {
  const grid = getGrid(input, true);
  return _.sum(_.flatten(grid));
}

exports.part2 = function(input) {
  let grid = getGrid(input);
  let region = 0;

  while (_.includes(_.flatten(grid), '#')) {
    region++;
    grid = markRegion(grid, region);
  }

  return region;
}
