const _ = require('lodash');
const {getInputArray} = require('./helpers')

let input;
input = getInputArray('2.txt');
input = _.map(input, row => {
  return _.map(_.split(row, '\t'), num => { return parseInt(num) });
});

// // Sample input
// // Part 1
// input = [
//   [5, 1, 9, 5],
//   [7, 5, 3],
//   [2, 4, 6, 8]
// ]; // 18
//
// // Part 2
// input = [
//   [5, 9, 2, 8],
//   [9, 4, 7, 3],
//   [3, 8, 6, 5]
// ]; // 9

// Part 1
let lineResults = [];

_.each(input, row => {
  const min = _.min(row);
  const max = _.max(row);
  lineResults.push(max - min);
});

console.log('# Part 1 #');
console.log(_.sum(lineResults));

// Part 2
lineResults = [];

_.each(input, row => {
  _.each(row, numA => {
    const found = !_.each(row, numB => {
      if (numA % numB === 0 && numA != numB) {
        lineResults.push(numA / numB);
        return false;
      }
    });

    if (found) {
      return false;
    }
  });
});

console.log('\n# Part 2 #');
console.log(_.sum(lineResults));
