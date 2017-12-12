var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/8.js`);

inputPart1 = [
  {
    input: [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ],
    expected: 1
  }
];

inputPart2 = [
  {
    input: [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ],
    expected: 10
  }
];

describe('Day 8 Sample Input', function() {
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
