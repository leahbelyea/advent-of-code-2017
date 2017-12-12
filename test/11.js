var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/11.js`);

inputPart1 = [
  { input: 'ne,ne,ne', expected: 3 },
  { input: 'ne,ne,sw,sw', expected: 0 },
  { input: 'ne,ne,s,s', expected: 2 },
  { input: 'se,sw,se,sw,sw', expected: 3 }
];

describe('Day 11 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
});
