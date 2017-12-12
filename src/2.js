const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, row => {
    return _.map(_.split(row, '\t'), num => { return parseInt(num) });
  });
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  const lineResults = [];

  _.each(input, row => {
    const min = _.min(row);
    const max = _.max(row);
    lineResults.push(max - min);
  });

  return _.sum(lineResults);
};

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  const lineResults = [];

  _.each(input, row => {
    _.each(row, numA => {
      const found = !_.each(row, numB => {
        if (numA % numB === 0 && numA != numB) {
          lineResults.push(numA / numB);
          return false;
        }
      });

      if (found) {
        return false;
      }
    });
  });

  return _.sum(lineResults);
};
