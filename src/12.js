const _ = require('lodash');
const {getInputArray} = require('./helpers');

let input;
input = getInputArray('12.txt');

// Sample input
// Part 1 and 2
// input = [
//   '0 <-> 2',
//   '1 <-> 1',
//   '2 <-> 0, 3, 4',
//   '3 <-> 2, 4',
//   '4 <-> 2, 3, 6',
//   '5 <-> 6',
//   '6 <-> 4, 5'
// ] // Part 1: 6, Part 2: 2

const programGraph = {};
_.each(input, line => {
  let [node, children] = _.split(line, ' <-> ');
  children = _.split(children, ', ');
  programGraph[parseInt(node)] = children;
});

function hasPath(start, end, graph) {
  const visited = [];
  const toEvaluate = [start];

  while (!_.isEmpty(toEvaluate)) {
    const node = toEvaluate.pop(1);

    if (node === end) {
      return true;
    }

    _.each(graph[node], child => {
      if (!_.includes(visited, child) && !_.includes(toEvaluate, child)) {
        toEvaluate.push(child);
      }
    });

    visited.push(node);
  }

  return false;
}

// Part 1
let numPaths = 0;
_.each(programGraph, (children, program) => {
  if (hasPath(program, '0', programGraph)) {
    numPaths++;
  }
});

console.log('# Part 1 #');
console.log(numPaths);


// Part 2
let numGroups = 0;
const graph = _.clone(programGraph);

while (!_.isEmpty(graph)) {
  const programs = _.keys(graph);
  const end = _.first(_.keys(graph));

  _.each(programs, program => {
    if (hasPath(program, end, programGraph)) {
      delete graph[program];
    }
  });

  numGroups++;
}

console.log('\n# Part 2 #');
console.log(numGroups);
