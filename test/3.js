var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/3.js`);

inputPart1 = [
  { input: 1, expected: 0 },
  { input: 12, expected: 3 },
  { input: 23, expected: 2 },
  { input: 1024, expected: 31 },
];

describe('Day 3 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
});
