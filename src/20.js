const _ = require('lodash');

function formatInput(rawInput) {
  return _.map(rawInput, line => {
    line = _.split(line, ', ');
    const position = _.map(_.split(_.trim(line[0], 'p=<>'), ','), num => {
      return parseInt(num);
    });
    const velocity = _.map(_.split(_.trim(line[1], 'v=<>'), ','), num => {
      return parseInt(num);
    });
    const acceleration = _.map(_.split(_.trim(line[2], 'a=<>'), ','), num => {
      return parseInt(num);
    });

    return {
      position,
      velocity,
      acceleration,
      distance: _.sum(_.map(position, Math.abs))
    };
  });
}

function moveParticles(particles) {
  _.each(particles, particle => {
    let {position, velocity, acceleration} = particle;
    velocity[0] += acceleration[0];
    velocity[1] += acceleration[1];
    velocity[2] += acceleration[2];
    position[0] += velocity[0];
    position[1] += velocity[1];
    position[2] += velocity[2];

    particle.distance = _.sum(_.map(position, Math.abs));
  })

  return particles;
}

function findClosestParticle(particles) {
  _.times(1000, () => {
    particles = moveParticles(particles);
  });

  let closestParticle = 0;
  let closestDistance =particles[0].distance;

  _.each(particles, (particle, index) => {
    if (particle.distance < closestDistance) {
      closestParticle = index;
      closestDistance = particle.distance;
    }
  });

  return closestParticle;
}

function removeCollisions(particles) {
  const collisions = [];
  const positions = _.map(particles, particle => {
    return _.join(particle.position, ',');
  });

  _.each(particles, particle => {
    const particlePosition = _.join(particle.position, ',');
    const numAtPosition = _.countBy(positions, position => {
      return position === particlePosition;
    }).true;
    if (numAtPosition > 1) {
      collisions.push(particlePosition);
    }
  });

  particles = _.filter(particles, particle => {
    const particlePosition = _.join(particle.position, ',');
    return !_.includes(collisions, particlePosition);
  });

  return particles;
}

function findParticlesLeft(particles) {
  _.times(50, (index) => {
    particles = moveParticles(particles);
    particles = removeCollisions(particles);
  });

  return _.size(particles);
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);
  return findClosestParticle(input);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  return findParticlesLeft(input);
}
