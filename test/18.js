var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/18.js`);

inputPart1 = [
  {
    input: [
      'set a 1',
      'add a 2',
      'mul a a',
      'mod a 5',
      'snd a',
      'set a 0',
      'rcv a',
      'jgz a -1',
      'set a 1',
      'jgz a -2'
    ],
    expected: 4
  }
];

inputPart2 = [
  {
    input: [
      'snd 1',
      'snd 2',
      'snd p',
      'rcv a',
      'rcv b',
      'rcv c',
      'rcv d'
    ],
    expected: 3
  }
];

describe('Day 18 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
  describe('Part 2', function() {
    _.each(inputPart2, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part2(input);
        assert.equal(answer, expected);
      });
    });
  });
});
