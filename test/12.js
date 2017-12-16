var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/12.js`);

inputPart1 = [
  {
    input: [
      '0 <-> 2',
      '1 <-> 1',
      '2 <-> 0, 3, 4',
      '3 <-> 2, 4',
      '4 <-> 2, 3, 6',
      '5 <-> 6',
      '6 <-> 4, 5'
    ],
    expected: 6
  }
];

inputPart2 = [
  {
    input: [
      '0 <-> 2',
      '1 <-> 1',
      '2 <-> 0, 3, 4',
      '3 <-> 2, 4',
      '4 <-> 2, 3, 6',
      '5 <-> 6',
      '6 <-> 4, 5'
    ],
    expected: 2
  }
];

describe('Day 12 Sample Input', function() {
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
