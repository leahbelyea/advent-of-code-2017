var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/15.js`);

inputPart1 = [
  { input: [
    'Generator A starts with 65',
    'Generator B starts with 8921'
  ],
  expected: 588 }
];

inputPart2 = [
  { input: [
    'Generator A starts with 65',
    'Generator B starts with 8921'
  ],
  expected: 309 }
];

describe('Day 15 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        this.timeout(150000);
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
  describe('Part 2', function() {
    _.each(inputPart2, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        this.timeout(150000);
        var answer = part2(input);
        assert.equal(answer, expected);
      });
    });
  });
});
