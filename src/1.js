const _ = require('lodash');
const {getInputString} = require('./helpers')

let input;
input = getInputString('1.txt');

// // Sample input
// // Part 1
// input = '1122'; // 3
// input = '1111'; // 4
// input = '1234'; // 0
// input = '91212129'; // 9
//
// // Part 2
// input = '1212'; // 6
// input = '1221'; // 0
// input = '123425'; // 4
// input = '123123'; // 12
// input = '12131415'; // 4

input = input.split('');

// Part 1
let doubleNums = [];
_.each(input, (char, index) => {
  const nextChar = _.get(input, `[${(index + 1) % _.size(input)}]`);
  if (char === nextChar) {
    doubleNums.push(parseInt(char));
  }
});

console.log('# Part 1 #');
console.log(_.sum(doubleNums));

// Part 2
doubleNums = [];
_.each(input, (char, index) => {
  const nextChar = _.get(input, `[${(index + (_.size(input) / 2)) % _.size(input)}]`);
  if (char === nextChar) {
    doubleNums.push(parseInt(char));
  }
});

console.log('\n# Part 2 #');
console.log(_.sum(doubleNums));
