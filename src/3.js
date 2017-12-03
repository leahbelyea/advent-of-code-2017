const _ = require('lodash');
const {getInputString} = require('./helpers')

let input = parseInt(getInputString('3.txt'));

// Sample input
// Part 1
// input = 1 // 0
// input = 12 // 3
// input = 23 // 2
// input = 1024 // 31

// Part 1

// I thought it would be fun to derive an equation to get the position of a
// number in the spiral, instead of having to construct the whole spiral
// programmatically to get the position. This went much worse than I had
// anticipated and I ended up with 5 sets of equations instead of 1.
// Note: these were derived based on the observation that each number along a
// diagonal line from the origin to the lower right is the square of an odd
// number: 1, 9, 25, 49 = 1^2, 3^2, 5^2, 7^2, etc. I find the nearest squared
// odd number in the diagonal line (s) to the given number (n), and calculate
// the coordinates of the given number from there.

function getSpiralPosition(n) {
  let x;
  let y;

  let rootS = Math.floor(Math.sqrt(n));
  rootS = rootS % 2 === 0 ? rootS - 1 : rootS;
  const s = Math.pow(rootS, 2);
  const sx = 1 + ((rootS - 3)/2);
  const sy = -sx;
  const nSDiff = n - s;

  switch(Math.ceil(nSDiff/(rootS + 1))) {
    case 0: // given number IS the nearest squared odd number
      x = sx;
      y = sy;
      break;
    case 1: // right side of grid
      x = sx + 1;
      y = sy + nSDiff - 1;
      break;

    case 2: // top side of grid
      x = sx - n + s + rootS + 2;
      y = sy + rootS;
      break;
    case 3: // left side of grid
      x = sx - rootS;
      y = sy - nSDiff + 3*rootS + 2;
      break;
    case 4: // bottom side of grid
      x = sx + (nSDiff % (rootS + 1)) - rootS;
      y = sy - 1;
      break;
  }

  return [x, y];
}

const inputPos = getSpiralPosition(input);
console.log('# Part 1 #');
console.log(Math.abs(inputPos[0]) + Math.abs(inputPos[1]));

// Part 2
const grid = {"0,0": 1};
let gridNumber = 1;
let lastVal = 1;

while (input >= lastVal) {
  gridNumber++;
  newCoords = getSpiralPosition(gridNumber);

  const newVal = _.sum([
    _.get(grid, `${newCoords[0] - 1},${newCoords[1] + 1}`, 0),
    _.get(grid, `${newCoords[0]},${newCoords[1] + 1}`, 0),
    _.get(grid, `${newCoords[0] + 1},${newCoords[1] + 1}`, 0),
    _.get(grid, `${newCoords[0] - 1},${newCoords[1]}`, 0),
    _.get(grid, `${newCoords[0] + 1},${newCoords[1]}`, 0),
    _.get(grid, `${newCoords[0] - 1},${newCoords[1] - 1}`, 0),
    _.get(grid, `${newCoords[0]},${newCoords[1] - 1}`, 0),
    _.get(grid, `${newCoords[0] + 1},${newCoords[1] - 1}`, 0)
  ]);

  grid[_.join(newCoords, ',')] = newVal;
  lastVal = newVal;
}

console.log('\n# Part 2 #');
console.log(lastVal);
