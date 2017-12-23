const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    return _.split(line, '');
  });
}

function getNextPosition(position, direction, diagram) {
  let nextPosition = _.clone(position);
  let prevPosition = _.clone(position);
  let nextDirection = direction;

  switch(direction) {
    case 'n':
    nextPosition[0]--;
    prevPosition[0]++;
    break;

    case 'e':
    nextPosition[1]++;
    prevPosition[1]--;
    break;

    case 's':
    nextPosition[0]++;
    prevPosition[0]--;
    break;

    case 'w':
    nextPosition[1]--;
    prevPosition[1]++;
    break;

    default:
    break;
  }

  // If dead end, change direction
  if (_.get(diagram, `[${nextPosition[0]}][${nextPosition[1]}]`, ' ') === ' ') {
    const neighbours = [
      {
        position: [position[0] + 1, position[1]],
        value: _.get(diagram, `[${position[0] + 1}][${position[1]}]`, ' '),
        direction: 's'
      },
      {
        position: [position[0] - 1, position[1]],
        value: _.get(diagram, `[${position[0] - 1}][${position[1]}]`, ' '),
        direction: 'n'
      },
      {
        position: [position[0], position[1] + 1],
        value: _.get(diagram, `[${position[0]}][${position[1] + 1}]`, ' '),
        direction: 'e'
      },
      {
        position: [position[0], position[1] - 1],
        value: _.get(diagram, `[${position[0]}][${position[1] - 1}]`, ' '),
        direction: 'w'
      }
    ];

    nextNeighbour = _.find(neighbours, neighbour => {
      const isBlank = neighbour.value === ' ';
      const isPrevPosition = neighbour.position[0] === prevPosition[0] && neighbour.position[1] === prevPosition[1];
      return !(isBlank || isPrevPosition);
    });

    nextPosition = nextNeighbour ? nextNeighbour.position : [];
    nextDirection = nextNeighbour ? nextNeighbour.direction : '';
  }

  return {
    nextPosition,
    nextDirection
  };
}

function travelPath(diagram) {
  const visited = [];
  let position = [0, _.indexOf(diagram[0], '|')];
  let direction = 's';
  let atEnd = false;
  let steps = 0;

  while (!atEnd) {
    let {nextPosition, nextDirection} = getNextPosition(position, direction, diagram);
    prevPosition = _.clone(position);
    position = _.clone(nextPosition);
    direction = nextDirection;
    steps++;

    const currentPosValue = _.get(diagram, `[${position[0]}][${position[1]}]`);
    const isLabel = !_.includes([' ', '-', '|', '+'], currentPosValue);
    if (isLabel) {
      visited.push(currentPosValue);
    }

    if (_.isEmpty(position)) {
      atEnd = true;
    }
  }

  return {
    path: _.join(visited, ''),
    steps
  };
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  const {path} = travelPath(input);
  return path;
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  const {steps} = travelPath(input);
  return steps;
}
