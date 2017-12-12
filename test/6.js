var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/6.js`);

inputPart1 = [
  {
    input: '0 2 7 0',
    expected: 5
  }
];

inputPart2 = [
  {
    input: '0 2 7 0',
    expected: 4
  }
];

describe('Day 6 Sample Input', function() {
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
