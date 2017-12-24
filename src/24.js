const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    const ports = _.map(_.split(line, '/'), port => { return parseInt(port) });
    return {
      id: line,
      ports
    }
  });
}

function getBestBridge(components, quality) {
  const starts = _.filter(components, component => {
    return _.includes(component.ports, 0);
  });

  let maxStrength = 0;
  let maxLength = 0;
  let bestBridge;

  _.each(starts, start => {
    start.reversed = start.ports[1] === 0;
    let unfinishedBridges = [[start]];

    while (_.size(unfinishedBridges) > 0) {
      bridge = unfinishedBridges.pop();

      const lastComponent = _.last(bridge);
      const port = lastComponent.reversed ? lastComponent.ports[0] : lastComponent.ports[1];
      _.each(components, component => {
        const componentIdentical = component.id === lastComponent.id;
        if (componentIdentical) {
          return;
        }
        const componentMatches = _.includes(component.ports, port);
        if (!componentMatches) {
          return;
        }
        const componentUsed = !_.isUndefined(_.find(bridge, {id: component.id}));
        if (componentUsed) {
          return;
        }
        foundNewPiece = true;
        const reversed = component.ports[0] !== port;
        const newBridge = [...bridge, {...component, reversed}];
        unfinishedBridges.push(newBridge);

        if (quality === 'strength') {
          const strength = getBridgeStrength(newBridge);
          if (strength > maxStrength) {
            maxStrength = strength;
            bestBridge = newBridge;
          }
        } else if (quality === 'length') {
          if (newBridge.length >= maxLength) {
            maxLength = newBridge.length;
            const strength = getBridgeStrength(newBridge);
            if (strength > maxStrength) {
              maxStrength = strength;
              bestBridge = newBridge;
            }
          }
        }
      });
    }
  });

  return bestBridge;
}

function getBridgeStrength(bridge) {
  return _.sum(_.map(bridge, component => { return _.sum(component.ports) }));
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  const bridge = getBestBridge(input, 'strength');
  return getBridgeStrength(bridge);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);

  const bridge = getBestBridge(input, 'length');
  return getBridgeStrength(bridge);
}
