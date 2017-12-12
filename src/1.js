const _ = require('lodash');

function formatInput(rawInput) {
  return rawInput.split('');
}

exports.inputType = 'string';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  const doubleNums = [];
  _.each(input, (char, index) => {
    const nextChar = _.get(input, `[${(index + 1) % _.size(input)}]`);
    if (char === nextChar) {
      doubleNums.push(parseInt(char));
    }
  });

  return _.sum(doubleNums);
};

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  const doubleNums = [];

  _.each(input, (char, index) => {
    const nextChar = _.get(input, `[${(index + (_.size(input) / 2)) % _.size(input)}]`);
    if (char === nextChar) {
      doubleNums.push(parseInt(char));
    }
  });

  return _.sum(doubleNums);
};
