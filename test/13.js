var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/13.js`);

inputPart1 = [
  {
    input: [
      '0: 3',
      '1: 2',
      '4: 4',
      '6: 4'
    ],
    expected: 24
  }
];

inputPart2 = [
  {
    input: [
      '0: 3',
      '1: 2',
      '4: 4',
      '6: 4'
    ],
    expected: 10
  }
];

describe('Day 13 Sample Input', function() {
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
