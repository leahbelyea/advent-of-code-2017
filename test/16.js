var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/16.js`);

inputPart1 = [
  { input:'s1,x3/4,pe/b', expected: 'baedc' }
];

inputPart2 = [
  { input:'s1,x3/4,pe/b', expected: 'ceadb' }
];

describe('Day 16 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input, true);
        assert.equal(answer, expected);
      });
    });
  });
  describe('Part 2', function() {
    _.each(inputPart2, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part2(input, true);
        assert.equal(answer, expected);
      });
    });
  });
});
