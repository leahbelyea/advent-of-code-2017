const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    return _.split(line, ' ');
  });
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  let validCount = 0;

  _.each(input, passphrase => {
    const wordCount = _.size(passphrase);
    const uniqueWordCount = _.size(_.uniq(passphrase));
    if (wordCount === uniqueWordCount) {
      validCount++;
    }
  });

  return validCount;
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);

  let validCount = 0;

  _.each(input, passphrase => {
    const wordCount = _.size(passphrase);
    const uniqueWordCount = _.size(_.uniqWith(passphrase, (a, b) => {
      a = _.split(a, '').sort();
      b = _.split(b, '').sort();
      return _.isEqual(a, b);
    }));

    if (wordCount === uniqueWordCount) {
      validCount++;
    }
  });

  return validCount;
}
