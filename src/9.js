const _ = require('lodash');

// Calculate score
function getScore(stream, score, level) {
  level++;

  if (_.size(stream) === 0) {
    return level;
  }

  let childScore = 0;
  _.each(stream, subStream => {
    childScore += getScore(subStream, score, level);
  });

  return score + level + childScore;
}

exports.inputType = 'string';

exports.part1 = function(input) {
  let stream = input.replace(/!.{1}/g, ''); // Remove ignored characters
  stream = stream.replace(/<[^>]*>,*/g, ''); // Remove garbage
  stream = stream.replace(/,}/g, '}'); // Remove any stray commas
  stream = stream.replace(/{,/g, '{');
  stream = stream.replace(/{{1}/g, '['); // Switch curly braces to square brackets
  stream = stream.replace(/}{1}/g, ']');
  stream = JSON.parse(stream); // Parse into JSON

  return getScore(stream, 0, 0);
}

exports.part2 = function(input) {
  let stream = input.replace(/!.{1}/g, ''); // Remove ignored characters
  const garbage = stream.match(/<[^>]*>/g); // Get garbage chunks

  // Count garbage
  const garbageCount = _.reduce(garbage, (result, value, key) => {
    return result + (value.length - 2); // Subtract 2 to account for angle brackets <>
  }, 0);

  return garbageCount;
}
