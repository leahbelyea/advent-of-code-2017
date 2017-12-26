const _ = require('lodash');

function formatInput(rawInput) {
  rawInput = _.map(rawInput, line => {
    line = _.replace(line, /[\.:]/g, '');
    return line;
  });
  const startState = _.split(rawInput.splice(0, 1), ' ')[3];
  const steps = _.split(rawInput.splice(0, 1), ' ')[5];
  const blueprints = {};

  while (_.size(rawInput) > 0) {
    const chunk = rawInput.splice(0, 9);
    const state = _.split(chunk[0], ' ')[2];
    blueprints[state] = [
      {
        write: parseInt(_.split(chunk[2], ' ')[8]),
        move: _.split(chunk[3], ' ')[10],
        state: _.split(chunk[4], ' ')[8]
      },
      {
        write: parseInt(_.split(chunk[6], ' ')[8]),
        move: _.split(chunk[7], ' ')[10],
        state: _.split(chunk[8], ' ')[8]
      }
    ];
  }

  return {
    startState,
    steps,
    blueprints
  };
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  let tape = {};
  let currentState = input.startState;
  let currentPos = 0;

  _.times(input.steps, () => {
    if (_.isUndefined(tape[currentPos])) {
      tape[currentPos] = 0;
    }

    const {write, move, state} = input.blueprints[currentState][tape[currentPos]];

    tape[currentPos] = write;
    currentPos += move === 'right' ? 1 : -1;
    currentState = state;
  });

  return _.sum(_.values(tape));
}
