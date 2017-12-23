const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    return _.split(line, ' ');
  });
}

function processInstruction(program) {
  const {registers, instructions, currentInstruction} = program;
  let [instruction, param1, param2] = instructions[currentInstruction];
  param2 = _.isNaN(parseInt(param2)) ? registers[param2] : parseInt(param2);

  switch (instruction) {
    case 'set':
    registers[param1] = param2;
    break;

    case 'sub':
    registers[param1] -= param2;
    break;

    case 'mul':
    registers[param1] *= param2;
    break;

    case 'jnz':
    param1 = parseInt(param1) || registers[param1];
    if (param1 !== 0) {
      program.currentInstruction += (param2 - 1);
    }
    break;
  }

  program.currentInstruction++;
  return program;
}

function isPrime(num) {
  for(var i = 2; i < num; i++) {
    if(num % i === 0) {
        return false;
    }
  }
  return num > 1;
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  let program = {
    registers: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0
    },
    instructions: input,
    currentInstruction: 0
  };
  let mulCount = 0;

  while (program.currentInstruction < _.size(program.instructions)) {
    if (program.instructions[program.currentInstruction][0] === 'mul') {
      mulCount++;
    }
    program = processInstruction(program);
  }

  return mulCount;
}

exports.part2 = function(rawInput) {

  // Solved this mostly on paper.
  // I ran the program and printed the registers every time it hit jnz g -13
  // (herein referred to the the loop).
  // I noted the following:
  // - b gets incremented by 17 every loop
  // - The program exits when b === c
  // - After the first loop, the value of b is 109300
  // - The value of c is 126300 and does not change
  // Therefore, the number of loops before the program terminates
  // is (126300 - 109300)/17 = 1000.
  // Because b is incremented after its chance to exit, the loop runs
  // one extra time before exiting, bringing h up to 1001.

  // HOWEVER, h only gets incremented if f is 0.
  // After modifying my input to lower the inital values of b and c (faster
  // runtimes to inspect the results), I noticed that f is not set to 0 when
  // b is a prime number. Thus, h increments only if b is NOT a prime number.
  // So, the final value in h is 1001 minus the number of times that
  // register b is a prime number.

  let b = 109300;
  let primeCount = 0;

  while (b <= 126300) {
    if (isPrime(b)) {
      primeCount++;
    }
    b += 17;
  }

  return 1001 - primeCount;
}
