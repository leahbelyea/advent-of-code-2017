const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, num => { return parseInt(num) });
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  let jumps = _.clone(input);
  let currentPos = 0;
  let steps = 0;

  while (currentPos < _.size(jumps) && currentPos >= 0) {
    const jump = jumps[currentPos];
    jumps[currentPos]++;
    currentPos += jump;
    steps++;
  }

  return steps;
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);

  jumps = _.clone(input);
  currentPos = 0;
  steps = 0;

  while (currentPos < _.size(jumps) && currentPos >= 0) {
    const jump = jumps[currentPos];
    jumps[currentPos] = jump >= 3 ? jumps[currentPos] - 1 : jumps[currentPos] + 1;
    currentPos += jump;
    steps++;
  }

  return steps;
}
