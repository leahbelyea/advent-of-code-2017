const _ = require('lodash');
const {getInputString} = require('./helpers')

let input;
input = getInputString('10.txt');
let list = _.map(new Array(256), (value, index) => { return index; });

// // Sample input
// // Part 1
// input = '3,4,1,5'; // 12
// list = _.map(new Array(5), (value, index) => { return index; });
// // Part 2
// input = '' //  a2582a3a0e66e6e86e3812dcb672a272
// input = 'AoC 2017' // 33efeb34ea91902bb2f59c9920caa6cd
// input = '1,2,3' // 3efbe78a8d82f29979031a4aa0b16a9d
// input = '1,2,4'// 63960835bcdc130f0b66d7ff4f6a5a8e

// Part 1
function getSublist(position, length, list) {
  const sublist =  [];

  _.times(length, () => {
    sublist.push(list[position]);
    position = (position + 1) % _.size(list);
  });

  return _.reverse(sublist);
}

function replaceSublist(newSublist, position, list) {
  _.each(newSublist, elem => {
    list[position] = elem;
    position = (position + 1) % _.size(list);
  });

  return list;
}

function doKnotHash(list, lengths, currentPos, currentSkip) {
  _.each(lengths, length => {
    const subList = getSublist(currentPos, length, list);
    list = replaceSublist(subList, currentPos, list);
    currentPos = (currentPos + length + currentSkip) % _.size(list);
    currentSkip++;
  });

  return [list, currentPos, currentSkip];
}

let lengths = _.map(_.split(input, ','), num => { return parseInt(num); });
const [hashedList] = doKnotHash(_.clone(list), lengths, 0, 0);

console.log('# Part 1 #');
console.log(hashedList[0] * hashedList[1]);


// Part 2
lengths = _.compact(_.map(_.split(input, ''), elem => {
  return elem.charCodeAt(0);
})).concat([17, 31, 73, 47, 23]);
list = _.map(new Array(256), (value, index) => { return index; });
let currentPos = 0;
let currentSkip = 0;

_.times(64, () => {
  [list, currentPos, currentSkip] = doKnotHash(list, lengths, currentPos, currentSkip);
})

const denseHash = [];

_.times(16, () => {
  const chunk = list.splice(0, 16);
  const elem = eval(_.join(chunk, '^'));
  denseHash.push(elem);
});

const hash = _.map(denseHash, elem => {
  return _.padStart(elem.toString(16), 2, '0');
});

console.log('\n# Part 2 #');
console.log(_.join(hash, ''));
