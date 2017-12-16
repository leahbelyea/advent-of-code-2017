const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(_.split(rawInput, ','), instruction => {
    const operation = instruction.slice(0, 1);
    const params = _.split(instruction.slice(1),'/');
    return {
      operation,
      params
    }
  });
}

function dance(programs, moves) {
  let indexA;
  let indexB;

  _.each(moves, move => {
    switch (move.operation) {
      case 's':
        const numPrograms = parseInt(move.params[0]);
        const shiftedPrograms = _.slice(programs, -numPrograms);
        programs = _.concat(shiftedPrograms, _.slice(programs, 0, -numPrograms));
        break;

      case 'x':
        indexA = parseInt(move.params[0]);
        indexB = parseInt(move.params[1]);
        const programA = programs[indexA];
        programs[indexA] = programs[indexB];
        programs[indexB] = programA;
        break;

      case 'p':
        indexA = programs.indexOf(move.params[0]);
        indexB = programs.indexOf(move.params[1]);
        programs[indexA] = programs[indexB];
        programs[indexB] = move.params[0];
        break;

      default:
        break;
    }
  });

  return programs;
}

exports.inputType = 'string';

exports.part1 = function(rawInput, test = false) {
  const input = formatInput(rawInput);
  let programs = test ? 'abcde' : 'abcdefghijklmnop';
  programs = _.split(programs, '');
  programs = dance(programs, input);

  return _.join(programs, '');
}

exports.part2 = function(rawInput, test = false) {
  const input = formatInput(rawInput);
  let programs = test ? 'abcde' : 'abcdefghijklmnop';
  programs = _.split(programs, '');

  // I printed out the results of the first 100 dances, and noted that the
  // order of the dancers cycles back to its original orientation every 48
  // dances. Thus, the orientation after 1 billion dances would be the same
  // as the orientation after 1000000000 % 48 = 16 dances

  const numDances = test ? 2 : 16;

  _.times(numDances, () => {
    programs = dance(programs, input);
  });

  return _.join(programs, '');
}
