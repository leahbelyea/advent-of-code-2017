const _ = require('lodash');
const {getInputString} = require('./helpers')

let input;
input = getInputString('6.txt');

// // Sample input
// // Part 1 and 2
// input = '0 2 7 0'; // Part 1: 5, Part 2: 4

input = _.map(_.split(input, /\s+/), num => { return parseInt(num) });

function getNewConfiguration(banks) {
  const maxBlocks = _.max(banks);
  const chosenBank = _.findIndex(banks, bank => { return bank === maxBlocks });
  let moveBlocks = maxBlocks;
  let currentBank = chosenBank;
  banks[currentBank] = 0;

  while (moveBlocks > 0) {
    currentBank = (currentBank + 1) % _.size(banks);
    banks[currentBank]++;
    moveBlocks--;
  }

  return banks;
}

// Part 1
const configurations = [];
let banks = _.clone(input);

while (!_.includes(configurations, _.join(banks, '-'))) {
  configurations.push(_.join(banks, '-'));
  banks = getNewConfiguration(banks);
}

console.log('# Part 1 #');
console.log(_.size(configurations));

// Part 2
const cycleStart = _.findIndex(configurations, configuration => { return configuration === _.join(banks, '-') });

console.log('\n# Part 2 #');
console.log(_.size(configurations) - cycleStart);
