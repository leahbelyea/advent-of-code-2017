const day = process.argv[2];
console.log(`######## Advent of Code Day ${day} ########\n`);
try {
  require(`./src/${day}.js`);
}
catch (e) {
  console.log(e);
}
