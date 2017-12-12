const _ = require('lodash');

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

exports.inputType = 'array';

exports.part1 = function(input, list) {
  list = list || _.map(new Array(256), (value, index) => { return index; });
  let lengths = _.map(_.split(input, ','), num => { return parseInt(num); });
  const [hashedList] = doKnotHash(_.clone(list), lengths, 0, 0);

  return hashedList[0] * hashedList[1];
}

exports.part2 = function(input) {
  let list = _.map(new Array(256), (value, index) => { return index; });
  let lengths = _.compact(_.map(_.split(input, ''), elem => {
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

  return _.join(hash, '');

}
