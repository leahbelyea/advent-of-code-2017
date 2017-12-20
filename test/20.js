var assert = require('assert');
var _ = require('lodash');
var {part1, part2} = require(`../src/20.js`);

inputPart1 = [
  {
    input: [
      'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>',
      'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'
    ],
    expected: 0
  }
];

inputPart2 = [
  {
    input: [
      'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>',
      'p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>',
      'p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>',
      'p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>'
    ],
    expected: 1
  }
];

describe('Day 20 Sample Input', function() {
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
