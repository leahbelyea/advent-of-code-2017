const _ = require('lodash');
const {getInputString} = require('./helpers')

let input;
input = getInputString('11.txt');

// Sample input
// Part 1
// input = 'ne,ne,ne' // 3
// input = 'ne,ne,sw,sw' // 0
// input = 'ne,ne,s,s' // 2
// input = 'se,sw,se,sw,sw' // 3

const directions = _.split(input, ',');

// Represent the hex grid as a regular grid. ne, se, sw, and nw all go
// diagonally (x+1, y+1) in the relevant direction. The way it works out,
// each step n/s on the hex grid is equivalent to TWO steps n/s on the regular
// grid. On the hex grid, and thus on the regular grid representation, there
// is no way to move directly east or west.

// We will first find the final position on the regular grid representation,
// then we will calculate how far away that is from the origin based on the hex
// grid.


// Part 1
let currentPos = {x: 0, y: 0};

// Find final position on the regular grid
_.each(directions, direction => {
  switch(direction) {
    case 'n':
      currentPos.y += 2;
      break;
    case 'ne':
      currentPos.x++;
      currentPos.y++;
      break;
    case 'se':
      currentPos.x++;
      currentPos.y--;
      break;
    case 's':
      currentPos.y -= 2;
      break;
    case 'sw':
      currentPos.x--;
      currentPos.y--;
      break;
    case 'nw':
      currentPos.x--;
      currentPos.y++;
      break;
  }
});

// Get distance. Based on scratch paper drawings, the shortest way to get back
// to the origin appears to be by going diagonally back to the origin as far
// as you can without passing it in either plane, then going n/s until you're at
// the origin. Since moving diagonally moves you the same distance in both the x
// and y direction, the most you can move diagonally without passing the origin
// in either the x or y plane is equal to the minimum distance from the origin
// in either plane. For example, if you are at [-1, 5], we are 1 away from the
// origin on the x plane, and 5 away on the y plane, thus we can move diagonally
// 1 time. The remaining distance is the max of the aforementioned distances
// (in our example, 5) minus the number of steps we took diagonally (1),
// divided by 2 because each n/s step on the hex grid is equivalent to 2 steps
// on the regular grid. In our example, the distance from the origin would be
// (5 - 1) / 2 = 3.

function getDistanceToOrigin(position) {
  const distances = _.map(position, Math.abs);
  let steps = 0;
  steps += _.min(distances);
  steps += (_.max(distances) - _.min(distances)) / 2;
  return steps;
}

console.log('# Part 1 #');
console.log(getDistanceToOrigin(currentPos));


// Part 2
currentPos = {x: 0, y: 0};
let currentDistance = 0;
let largestDistance = 0;

_.each(directions, direction => {
  switch(direction) {
    case 'n':
      currentPos.y += 2;
      break;
    case 'ne':
      currentPos.x++;
      currentPos.y++;
      break;
    case 'se':
      currentPos.x++;
      currentPos.y--;
      break;
    case 's':
      currentPos.y -= 2;
      break;
    case 'sw':
      currentPos.x--;
      currentPos.y--;
      break;
    case 'nw':
      currentPos.x--;
      currentPos.y++;
      break;
  }

  currentDistance = getDistanceToOrigin(currentPos);
  if (currentDistance > largestDistance) {
    largestDistance = currentDistance;
  }

});

console.log('\n# Part 2 #');
console.log(largestDistance);
