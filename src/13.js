const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    line = _.split(line, ': ');
    return {
      depth: parseInt(line[0]),
      range: parseInt(line[1])
    }
  });
}

function getSeverity(input) {
  let severity = 0;

  for (let i = 0; i < input.length; i++) {
    const time = input[i].depth;
    const a = input[i].range - 1;
    const b = Math.floor(time / a);
    const c = time % a;
    const scannerIndex = ((b%2)*(a - 2*c)) + c;
    if (scannerIndex === 0) {
      severity += input[i].depth * input[i].range;
    }
  }

  return severity;
}

function isStuck(input, delay) {
  for (let i = 0; i < input.length; i++) {
    const time = delay + input[i].depth;
    const a = input[i].range - 1;
    const b = Math.floor(time / a);
    const c = time % a;
    const scannerIndex = ((b%2)*(a - 2*c)) + c;
    if (scannerIndex === 0) {
      return true;
    }
  }

  return false;
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  return getSeverity(input);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);

  let delay = 0;
  let canPass = false;

  while (!canPass) {
    delay++;
    canPass = !isStuck(input, delay);
  }

  return delay;
}
