const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    return _.split(line, ' ');
  });
}

function buildGraph(input) {
  const graph = {};

  _.each(input, line => {
    let [node, children] = _.split(line, ' <-> ');
    children = _.split(children, ', ');
    graph[parseInt(node)] = children;
  });

  return graph;
}

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

exports.inputType = 'array';

exports.part1 = function(input) {
  const programGraph = buildGraph(input);
  let numPaths = 0;

  _.each(programGraph, (children, program) => {
    if (hasPath(program, '0', programGraph)) {
      numPaths++;
    }
  });

  return numPaths;

}

exports.part2 = function(input) {
  const programGraph = buildGraph(input);
  const graph = _.clone(programGraph);
  let numGroups = 0;

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

  return numGroups;
}
