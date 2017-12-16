var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/14.js`);

inputPart1 = [
  { input: 'flqrgnkx', expected: 8108 }
];

inputPart2 = [
  { input: 'flqrgnkx', expected: 1242 }
];

describe('Day 14 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        this.timeout(5000);
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
  describe('Part 2', function() {
    _.each(inputPart2, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        this.timeout(20000);
        var answer = part2(input);
        assert.equal(answer, expected);
      });
    });
  });
});
