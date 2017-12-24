var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/24.js`);

inputPart1 = [
  {
    input: [
      '0/2',
      '2/2',
      '2/3',
      '3/4',
      '3/5',
      '0/1',
      '10/1',
      '9/10'
    ],
    expected: 31
  }
];

inputPart2 = [
  {
    input: [
      '0/2',
      '2/2',
      '2/3',
      '3/4',
      '3/5',
      '0/1',
      '10/1',
      '9/10'
    ],
    expected: 19
  }
];

describe('Day 24 Sample Input', function() {
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
