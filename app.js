const day = process.argv[2];
console.log(`######## Advent of Code Day ${day} ########\n\n`);
try {
  require(`./src/${day}.js`);
}
catch (e) {
  console.log('Code for the specified day does not exist yet');
}
