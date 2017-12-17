const _ = require('lodash');

function completeBuffer(steps, reps) {
  const buffer = [];
  let currentPosition;
  let insertIndex = 0;

  _.times(reps, num => {
    buffer.splice(insertIndex, 0, num);
    currentPosition = insertIndex;
    insertIndex = ((currentPosition + steps) % _.size(buffer)) + 1;
  });

  return buffer;
}

function getValueAfter0(steps, reps) {
  let bufferSize = 0;
  let currentPosition = 0;
  let insertIndex = 0;
  let secondValue;

  _.times(reps, num => {
    bufferSize++;
    currentPosition = insertIndex;
    secondValue = insertIndex === 1 ? num : secondValue;
    insertIndex = ((currentPosition + steps) % bufferSize) + 1;
  });

  return secondValue;
}

exports.inputType = 'string';

exports.part1 = function(input) {
  const buffer = completeBuffer(parseInt(input), 2018);
  const index = buffer.indexOf(2017) + 1;
  return buffer[index];
}

exports.part2 = function(input) {
  return getValueAfter0(parseInt(input), 50000000);
}
