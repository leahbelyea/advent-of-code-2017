const _ = require('lodash');
const {getInputString} = require('./helpers')

let input;
input = getInputString('9.txt');

// Sample input
// Part 1
// input = '{}'; // 1
// input = '{{{}}}'; // 6
// input = '{{},{}}'; // 5
// input = '{{{},{},{{}}}}'; // 16
// input = '{<a>,<a>,<a>,<a>}'; // 1
// input = '{{<ab>},{<ab>},{<ab>},{<ab>}}'; // 9
// input = '{{<!!>},{<!!>},{<!!>},{<!!>}}'; // 9
// input = '{{<a!>},{<a!>},{<a!>},{<ab>}}'; // 3

// Part 1
let stream = input.replace(/!.{1}/g, ''); // Remove ignored characters
stream = stream.replace(/<[^>]*>/g, ''); // Remove garbage
stream = stream.replace(/,}/g, '}'); // Remove any stray commas
stream = stream.replace(/{,/g, '{');
stream = stream.replace(/{{1}/g, '['); // Switch curly braces to square brackets
stream = stream.replace(/}{1}/g, ']');
stream = JSON.parse(stream); // Parse into JSON

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

console.log('# Part 1 #');
console.log(getScore(stream, 0, 0));


// Part 2
stream = input.replace(/!.{1}/g, ''); // Remove ignored characters
const garbage = stream.match(/<[^>]*>/g); // Get garbage chunks

// Count garbage
const garbageCount = _.reduce(garbage, (result, value, key) => {
  return result + (value.length - 2); // Subtract 2 to account for angle brackets <>
}, 0);

console.log('\n# Part 2 #');
console.log(garbageCount);
