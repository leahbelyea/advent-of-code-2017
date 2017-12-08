const _ = require('lodash');
const {getInputArray} = require('./helpers')

let input;
input = getInputArray('8.txt');

// // Sample input
// // Part 1 and 2
// input= [
//   'b inc 5 if a > 1',
//   'a inc 1 if b < 5',
//   'c dec -10 if a >= 1',
//   'c inc -20 if c == 10'
// ]; // Part 1: 1, Part 2: 10

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

// Part 1
let registers = {};

_.each(input, instruction => {
  registers = processInstruction(instruction, registers);
});

console.log('# Part 1 #');
console.log(_.max(_.map(registers)));

// Part 2
registers = {};
let maxVal;

_.each(input, instruction => {
  registers = processInstruction(instruction, registers);
  const currentMax = _.max(_.map(registers));
  maxVal =  !maxVal || currentMax > maxVal? currentMax : maxVal;
});

console.log('\n\n# Part 2 #');
console.log(maxVal);
