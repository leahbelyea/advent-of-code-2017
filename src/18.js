const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    return _.split(line, ' ');
  });
}

function getFirstRcv(instructions) {
  registers = {};
  sounds = {};

  for (let i = 0; i < instructions.length; i++) {
    let [instruction, param1, param2] = instructions[i];

    // Get value of param 2
    param2 = _.isNaN(parseInt(param2)) ? registers[param2] : parseInt(param2);

    // Initialize register
    registers[param1] = registers[param1] || 0;

    // Process instruction
    switch (instruction) {
      case 'snd':
      sounds[param1] = registers[param1];
      break;

      case 'set':
      registers[param1] = param2;
      break;

      case 'add':
      registers[param1] += param2;
      break;

      case 'mul':
      registers[param1] *= param2;
      break;

      case 'mod':
      registers[param1] = registers[param1] % param2;
      break;

      case 'rcv':
      if (registers[param1] !== 0 && sounds[param1]) {
        return sounds[param1];
      }
      break;

      case 'jgz':
      param1Val = parseInt(param1) || registers[param1];
      if (param1Val > 0) {
        i = (i - 1) + param2;
      }
      break;
    }
  }
}

function runProgram(program, instructions) {
  const {id, registers, currentInstruction, sent, received} = program;

  let i;
  for (i = currentInstruction; i < instructions.length; i++) {
    let [instruction, param1, param2] = instructions[i];

    // Get value of param 2
    param2 = _.isNaN(parseInt(param2)) ? registers[param2] : parseInt(param2);

    // Initialize register
    if (!_.has(registers, param1) && _.isNaN(parseInt(param1))) {
      registers[param1] = registers[param1] || param1 === 'p'? id : 0;
    }

    // Process instruction
    switch (instruction) {
      case 'snd':
      param1 = _.isNaN(parseInt(param1)) ? registers[param1] : parseInt(param1);
      sent.push(param1);
      break;

      case 'set':
      registers[param1] = param2;
      break;

      case 'add':
      registers[param1] += param2;
      break;

      case 'mul':
      registers[param1] *= param2;
      break;

      case 'mod':
      registers[param1] = registers[param1] % param2;
      break;

      case 'rcv':
      if (_.size(received) > 0) {
        registers[param1] = received.shift();
      } else {
        program.currentInstruction = i;
        return program;
      }
      break;

      case 'jgz':
      param1Val = parseInt(param1) || registers[param1];
      if (param1Val > 0) {
        i = (i - 1) + param2;
      }
      break;
    }
  }

  program.terminated = true;
  return program;
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  return getFirstRcv(input);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  let p0 = {
    id: 0,
    registers: {},
    currentInstruction: 0,
    sent: [],
    received: [],
    terminated: false
  };
  let p1 = {
    id: 1,
    registers: {},
    currentInstruction: 0,
    sent: [],
    received: [],
    terminated: false
  };
  let p1SendCount = 0;
  let finished = false;

  // Run first program until it is waiting for a value, then run the next. Repeat
  // until both programs terminate, or are deadlocked.
  while (!finished) {
    if (!p0.terminated) {
      p0 = runProgram(p0, input);
      p1.received = p1.received.concat(p0.sent);
      p0.sent = [];
    }

    if (!p1.terminated) {
      p1 = runProgram(p1, input);
      p1SendCount += _.size(p1.sent);
      p0.received = p0.received.concat(p1.sent);
      p1.sent = [];
    }

    finished =
      (p0.terminated && p1.terminated) ||
      (p0.terminated && _.size(p1.received) === 0) ||
      (_.size(p0.received) === 0 && p1.terminated) ||
      (_.size(p0.received) === 0 && _.size(p1.received) === 0);
  }

  return p1SendCount;
}
