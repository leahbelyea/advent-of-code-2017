const _ = require('lodash');
const {getInputArray} = require('./helpers')

let input;
input = _.map(getInputArray('5.txt'), num => { return parseInt(num) });

// // Sample input
// // Part 1 and 2
// input = [0, 3, 0, 1, -3]; // Part 1: 5, Part 2: 10

// Part 1
let jumps = _.clone(input);
let currentPos = 0;
let steps = 0;

while (currentPos < _.size(jumps) && currentPos >= 0) {
  const jump = jumps[currentPos];
  jumps[currentPos]++;
  currentPos += jump;
  steps++;
}

console.log('# Part 1 #');
console.log(steps);

// Part 2
jumps = _.clone(input);
currentPos = 0;
steps = 0;

while (currentPos < _.size(jumps) && currentPos >= 0) {
  const jump = jumps[currentPos];
  jumps[currentPos] = jump >= 3 ? jumps[currentPos] - 1 : jumps[currentPos] + 1;
  currentPos += jump;
  steps++;
}

console.log('\n# Part 2 #');
console.log(steps);
