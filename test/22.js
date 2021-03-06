var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/22.js`);

inputPart1 = [
  {
    input: [
      '..#',
      '#..',
      '...'
    ],
    expected: 5587
  }
];

inputPart2 = [
  {
    input: [
      '..#',
      '#..',
      '...'
    ],
    expected: 2511944
  }
];

describe('Day 22 Sample Input', function() {
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
        this.timeout(15000);
        var answer = part2(input);
        assert.equal(answer, expected);
      });
    });
  });
});
