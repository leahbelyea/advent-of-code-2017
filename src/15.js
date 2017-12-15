const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    line = _.split(line, ' ');
    return parseInt(_.last(line));
  });
}

function generateValue(generator, startValue) {
  const factor = generator === 'a' ? 16807 : 48271;
  return (startValue * factor) % 2147483647;
}

function generatePickyValue(generator, startValue) {
  const factor = generator === 'a' ? 16807 : 48271;
  const multiple = generator === 'a' ? 4 : 8;
  let value = startValue;
  let valid = false;

  while (!valid) {
    value = (value * factor) % 2147483647;
    valid = value % multiple === 0;
  }

  return value;
}

function compareValues(a, b) {
  a = _.padStart(a.toString(2), 16, '0');
  b = _.padStart(b.toString(2), 16, '0');
  a = a.substr(a.length - 16);
  b = b.substr(b.length - 16);

  return a === b;
}

function judgeDuel(a, b, numRounds, generateFn) {
  let score = 0;
  _.times(numRounds, () => {
    a = generateFn('a', a);
    b = generateFn('b', b);
    if (compareValues(a, b)) {
      score++;
    }
  });

  return score;
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  return judgeDuel(input[0], input[1], 40000000, generateValue);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  return judgeDuel(input[0], input[1], 5000000, generatePickyValue);
}
