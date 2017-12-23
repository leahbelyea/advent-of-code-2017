const _ = require('lodash');

const directions = ['up', 'right', 'down', 'left'];
const forwardMoves = {
  'up': {x: 0, y: -1},
  'right': {x: 1, y: 0},
  'down': {x: 0, y: 1},
  'left': {x: -1, y: 0}
}

function formatInput(rawInput) {
 return _.map(rawInput, line => {
   return _.split(line, '');
 });
}

function getPreInfectedNodes(map) {
  const preInfecctedNodes = {};

  _.each(map, (line, y) => {
    _.each(line, (node, x) => {
        if (node === '#') {
        preInfecctedNodes[`${x},${y}`] = 'infected';
      }
    });
  });

  return preInfecctedNodes;
}

function doBurst({x, y, direction}, nodes) {
  let infectedCount = 0;

  if (_.isUndefined(nodes[`${x},${y}`])) {
    direction = directions[(_.indexOf(directions, direction) + 3) % 4];
    nodes[`${x},${y}`] = 'infected';
    infectedCount = 1;
  } else {
    direction = directions[(_.indexOf(directions, direction) + 1) % 4];
    delete nodes[`${x},${y}`];
  }

  x += forwardMoves[direction].x;
  y += forwardMoves[direction].y;

  return {
    virus: {x, y, direction},
    nodes,
    infectedCount
  }
}

function doEvolvedBurst({x, y, direction}, nodes) {
  let infectedCount = 0;

  if (_.isUndefined(nodes[`${x},${y}`])) {
    direction = directions[(_.indexOf(directions, direction) + 3) % 4];
    nodes[`${x},${y}`] = 'weakened';
  } else if (nodes[`${x},${y}`] === 'weakened') {
    nodes[`${x},${y}`] = 'infected';
    infectedCount = 1;
  } else if (nodes[`${x},${y}`] === 'infected') {
    direction = directions[(_.indexOf(directions, direction) + 1) % 4];
    nodes[`${x},${y}`] = 'flagged';
  } else if (nodes[`${x},${y}`] === 'flagged') {
    direction = directions[(_.indexOf(directions, direction) + 2) % 4];
    delete nodes[`${x},${y}`];
  }

  x += forwardMoves[direction].x;
  y += forwardMoves[direction].y;

  return {
    virus: {x, y, direction},
    nodes,
    infectedCount
  }
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  const preInfectedNodes = getPreInfectedNodes(input);

  let nodes = _.clone(preInfectedNodes);
  let virus = {
    x: (_.size(input[0]) - 1) / 2,
    y: (_.size(input) - 1) / 2,
    direction: 'up'
  };
  let infectBursts = 0;

  _.times(10000, () => {
    const burst = doBurst(virus, nodes);
    virus = burst.virus;
    infectedNodes = burst.infectedNodes;
    infectBursts += burst.infectedCount;
  });

  return infectBursts;
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  const preInfectedNodes = getPreInfectedNodes(input);

  let nodes = _.clone(preInfectedNodes);
  let virus = {
    x: (_.size(input[0]) - 1) / 2,
    y: (_.size(input) - 1) / 2,
    direction: 'up'
  };
  let infectBursts = 0;

  _.times(10000000, () => {
    const burst = doEvolvedBurst(virus, nodes);
    virus = burst.virus;
    nodes = burst.nodes;
    infectBursts += burst.infectedCount;
  });

  return infectBursts;
}
