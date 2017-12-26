var assert = require('assert');
var _ = require('lodash');
var {part1} = require(`../src/25.js`);

inputPart1 = [
  {
    input: [
      'Begin in state A.',
      'Perform a diagnostic checksum after 6 steps.',

      'In state A:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state B.',
      '  If the current value is 1:',
      '    - Write the value 0.',
      '    - Move one slot to the left.',
      '    - Continue with state B.',

      'In state B:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the left.',
      '    - Continue with state A.',
      '  If the current value is 1:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state A.'
    ],
    expected: 3
  }
];

describe('Day 25 Sample Input', function() {
  describe('Part 1', function() {
    _.each(inputPart1, ({input, expected}, index) => {
      it(`should pass with sample input ${index}`, function() {
        var answer = part1(input);
        assert.equal(answer, expected);
      });
    });
  });
});
