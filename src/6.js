const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(_.split(rawInput, /\s+/), num => { return parseInt(num) });
}

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

function getConfigurations(banks) {
  const configurations = [];

  while (!_.includes(configurations, _.join(banks, '-'))) {
    configurations.push(_.join(banks, '-'));
    banks = getNewConfiguration(banks);
  }

  return configurations;
}

exports.inputType = 'string';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  const configurations = getConfigurations(_.clone(input));
  return _.size(configurations);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);

  const banks = _.clone(input);
  const configurations = getConfigurations(banks);
  const cycleStart = _.findIndex(configurations, configuration => { return configuration === _.join(banks, '-') });
  return _.size(configurations) - cycleStart;
}
