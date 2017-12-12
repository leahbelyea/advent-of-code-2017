const day = process.argv[2];
const {part1, part2, inputType} = require(`./src/${day}.js`);
const {getInputArray, getInputString} = require('./src/helpers');

const rawInput = inputType === 'string' ?
  getInputString(`${day}.txt`) :
  getInputArray(`${day}.txt`);

console.log(`######## Advent of Code Day ${day} ########\n`);
console.log('# Part 1 #');
console.log(part1(rawInput));
console.log('\n# Part 2 #');
console.log(part2(rawInput));
