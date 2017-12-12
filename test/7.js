var assert = require('assert');
var _ = require('lodash');
var {part1, part2, inputType} = require(`../src/7.js`);

inputPart1 = [
  {
    input: [
      'pbga (66)',
      'xhth (57)',
      'ebii (61)',
      'havc (66)',
      'ktlj (57)',
      'fwft (72) -> ktlj, cntj, xhth',
      'qoyq (66)',
      'padx (45) -> pbga, havc, qoyq',
      'tknk (41) -> ugml, padx, fwft',
      'jptl (61)',
      'ugml (68) -> gyxo, ebii, jptl',
      'gyxo (61)',
      'cntj (57)'
    ],
    expected: 'tknk'
  }
];

inputPart2 = [
  {
    input: [
      'pbga (66)',
      'xhth (57)',
      'ebii (61)',
      'havc (66)',
      'ktlj (57)',
      'fwft (72) -> ktlj, cntj, xhth',
      'qoyq (66)',
      'padx (45) -> pbga, havc, qoyq',
      'tknk (41) -> ugml, padx, fwft',
      'jptl (61)',
      'ugml (68) -> gyxo, ebii, jptl',
      'gyxo (61)',
      'cntj (57)'
    ],
    expected: 60
  }
];

describe('Day 7 Sample Input', function() {
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
