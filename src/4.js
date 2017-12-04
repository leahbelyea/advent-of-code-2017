const _ = require('lodash');
const {getInputArray} = require('./helpers')

let input;
input = getInputArray('4.txt');

// // Sample input
// // Part 1
// input = [
//   'aa bb cc dd ee',
//   'aa bb cc dd aa',
//   'aa bb cc dd aaa'
// ]; // 2
// // Part 2
// input = [
//   'abcde fghij',
//   'abcde xyz ecdab',
//   'a ab abc abd abf abj',
//   'iiii oiii ooii oooi oooo',
//   'oiii ioii iioi iiio'
// ]; // 3

input = _.map(input, line => {
  return _.split(line, ' ');
})

// Part 1
let validCount = 0;

_.each(input, passphrase => {
  const wordCount = _.size(passphrase);
  const uniqueWordCount = _.size(_.uniq(passphrase));
  if (wordCount === uniqueWordCount) {
    validCount++;
  }
});

console.log('# Part 1 #');
console.log(validCount);

// Part 2
validCount = 0;

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

console.log('\n# Part 2 #');
console.log(validCount);
