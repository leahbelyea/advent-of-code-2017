var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/1.js`);

inputPart1 = [
  { input: '1122', expected: 3},
  { input: '1111', expected: 4},
  { input: '1234', expected: 0},
  { input: '91212129', expected: 9}
];

inputPart2 = [
  { input: '1212', expected: 6},
  { input: '1221', expected: 0},
  { input: '123425', expected: 4},
  { input: '123123', expected: 12},
  { input: '12131415', expected: 4}
];

describe('Day 1 Sample Input', function() {
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
