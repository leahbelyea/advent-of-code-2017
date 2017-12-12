var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/4.js`);

inputPart1 = [
  {
    input: [
      'aa bb cc dd ee',
      'aa bb cc dd aa',
      'aa bb cc dd aaa'
    ],
    expected: 2
  }
];

inputPart2 = [
  {
    input: [
      'abcde fghij',
      'abcde xyz ecdab',
      'a ab abc abd abf abj',
      'iiii oiii ooii oooi oooo',
      'oiii ioii iioi iiio'
    ],
    expected: 3
  }
];

describe('Day 4 Sample Input', function() {
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
