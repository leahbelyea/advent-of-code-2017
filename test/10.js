var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/10.js`);

inputPart1 = [
  { input: '3,4,1,5', expected: 12 }
];

inputPart2 = [
  { input: '', expected: 'a2582a3a0e66e6e86e3812dcb672a272' },
  { input: 'AoC 2017', expected: '33efeb34ea91902bb2f59c9920caa6cd' },
  { input: '1,2,3', expected: '3efbe78a8d82f29979031a4aa0b16a9d' },
  { input: '1,2,4', expected: '63960835bcdc130f0b66d7ff4f6a5a8e' }
];

describe('Day 10 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var list = _.map(new Array(5), (value, index) => { return index; });
        var answer = part1(input, list);
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
