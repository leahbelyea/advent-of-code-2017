const _ = require('lodash');

function processInstruction(instruction, registers) {
  // Parse instruction
  const [
    register,
    operation,
    amountString,
    ,
    conditionRegister,
    conditionOperator,
    conditionAmount
  ] = _.split(instruction, ' ');
  const amount = parseInt(amountString);

  // Evaluate condition
  const conditionRegisterVal = _.get(registers, conditionRegister, 0);
  const conditionString = `${conditionRegisterVal} ${conditionOperator} ${conditionAmount}`;
  const runOperation = eval(conditionString);
  if (!runOperation) {
    return registers;
  }

  // Initialize register if necessary
  registers[register] = _.get(registers, register, 0);

  // Run operation
  switch (operation) {
    case 'inc':
      registers[register] += amount;
      break;
    case 'dec':
      registers[register] -= amount;
      break;
    default:
      break;
  }

  return registers;
}

exports.inputType = 'array';

exports.part1 = function(input) {
  let registers = {};

  _.each(input, instruction => {
    registers = processInstruction(instruction, registers);
  });

  return _.max(_.map(registers));
}

exports.part2 = function(input) {
  let registers = {};
  let maxVal;

  _.each(input, instruction => {
    registers = processInstruction(instruction, registers);
    const currentMax = _.max(_.map(registers));
    maxVal =  !maxVal || currentMax > maxVal? currentMax : maxVal;
  });

  return maxVal;
}
