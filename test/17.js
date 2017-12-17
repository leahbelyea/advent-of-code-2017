var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/17.js`);

inputPart1 = [
  { input: '3', expected: 638 }
];

describe('Day 17 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
});
