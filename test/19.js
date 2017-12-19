var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/19.js`);

inputPart1 = [
  {
    input: [
      '    |          ',
      '    |  +--+    ',
      '    A  |  C    ',
      'F---|----E|--+ ',
      '    |  |  |  D ',
      '    +B-+  +--+ '
    ],
    expected: 'ABCDEF'
  }
];

inputPart2 = [
  {
    input: [
      '    |          ',
      '    |  +--+    ',
      '    A  |  C    ',
      'F---|----E|--+ ',
      '    |  |  |  D ',
      '    +B-+  +--+ '
    ],
    expected: 38
  }
];

describe('Day 19 Sample Input', function() {
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
