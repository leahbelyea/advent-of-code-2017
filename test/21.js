var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/21.js`);

inputPart1 = [
  {
    input: [
      '../.# => ##./#../...',
      '.#./..#/### => #..#/..../..../#..#'
    ],
    expected: 12
  }
];

describe('Day 21 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input, 2);
        assert.equal(answer, expected);
      });
    });
  });
});
