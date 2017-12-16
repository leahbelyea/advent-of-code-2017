var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/2.js`);

inputPart1 = [
  {
    input: [
      ['5\t1\t9\t5'],
      ['7\t5\t3'],
      ['2\t4\t6\t8']
    ],
    expected: 18
  }
];

inputPart2 = [
  {
    input: [
      [`5\t9\t2\t8`],
      [`9\t4\t7\t3`],
      [`3\t8\t6\t5`]
    ],
    expected: 9
  }
];

describe('Day 2 Sample Input', function() {
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
