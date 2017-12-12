var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/9.js`);

inputPart1 = [
  { input: '{}', expected: 1},
  { input: '{{{}}}', expected: 6},
  { input: '{{},{}}', expected: 5},
  { input: '{{{},{},{{}}}}', expected: 16},
  { input: '{<a>,<a>,<a>,<a>}', expected: 1},
  { input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', expected: 9},
  { input: '{{<!!>},{<!!>},{<!!>},{<!!>}}', expected: 9},
  { input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', expected: 3}
];

inputPart2 = [
  { input: '<>', expected: 0 },
  { input: '<random characters>', expected: 17 },
  { input: '<<<<>', expected: 3 },
  { input: '<{!>}>', expected: 2 },
  { input: '<!!>', expected: 0 },
  { input: '<!!!>>', expected: 0 },
  { input: '<{o"i!a,<{i<a>', expected: 10 }
];

describe('Day 9 Sample Input', function() {
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
