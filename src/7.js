const _ = require('lodash');

function formatInput(rawInput) {
  // Format input into node map
  let nodes = {};
  _.each(rawInput, nodeString => {
    const [nodeInfo, childrenInfo] = _.split(nodeString, ' -> ');
    const [name, size] = _.split(nodeInfo.replace(/\(|\)/g,''), ' ');
    let children = [];
    if (childrenInfo) {
      children = _.split(childrenInfo, ', ');
    }
    nodes[name] = {
      size: parseInt(size),
      children
    };
  });

  return nodes;
}

// Finds the root of the tree
function findRoot(tree) {
  let childNodes = [];
  const parentNodes = [];
  _.each(tree, (node, name) => {
    if (_.isEmpty(node.children)) {
      childNodes.push(name);
    } else {
      parentNodes.push(name);
      childNodes = _.concat(childNodes, node.children);
    }
  });

  childNodes = _.uniq(childNodes);
  let root;

  _.each(parentNodes, parentNode => {
    if (!_.includes(childNodes, parentNode)) {
      root = parentNode;
      return false;
    }
  });

  return root;
}

// Checks whether node is balanced
// (i.e. whether all children have same total weight)
function isBalanced(nodeName, tree) {
  const node = tree[nodeName];
  const childWeights = _.map(node.children, child => {
    return getTotalSize(child, tree);
  });

  let isBalanced = true;
  _.each(childWeights, weight => {
    if (weight !== _.first(childWeights)) {
      isBalanced = false;
      return false;
    }
  })

  return isBalanced;
}

// Gets the deepest level unbalanced node. Assumes that the root will also be
// unbalanced
function getUnbalancedNode(root, tree) {
  let unbalancedNode = root;
  let hasUnbalancedChild = true;

  while (hasUnbalancedChild) {
    hasUnbalancedChild = false;
    const children = tree[unbalancedNode].children;
    _.each(children, child => {
      if (!isBalanced(child, tree)) {
        unbalancedNode = child;
        hasUnbalancedChild = true;
        return false;
      }
    });
  }

  return unbalancedNode;
}

// Gets total size of node; this includes size of node itself and all children
function getTotalSize(nodeName, tree) {
  const node = tree[nodeName];
  let totalSize = node.size;
  _.each(node.children, child => {
    totalSize = totalSize + getTotalSize(child, tree);
  });
  return totalSize;
}

exports.inputType = 'array';

exports.part1 = function(rawInput) {
  const input = formatInput(rawInput);

  return findRoot(input);
}

exports.part2 = function(rawInput) {
  const input = formatInput(rawInput);
  const nodes = _.clone(input);
  const root = findRoot(nodes);

  // Get children of the unbalanced node, and sort them in order of their
  // total size
  const unbalancedChildren = _.sortBy(
    _.map(nodes[getUnbalancedNode(root, nodes)].children, child => {
      return {
        totalSize: getTotalSize(child, nodes),
        name: child,
        size: nodes[child].size
      };
    }),
    'totalSize'
  );

  // Get correct incorrect and incorrect total sizes. Only one node has incorrect
  // size, so if the sizes of the first two sorted children are equal, the last
  // child has the incorrect size
  let incorrectTotalSize;
  let correctTotalSize;

  if (unbalancedChildren[0].totalSize === unbalancedChildren[1].totalSize) {
    correctTotalSize = _.first(unbalancedChildren).totalSize;
    incorrectTotalSize = _.last(unbalancedChildren).totalSize;
  } else {
    correctTotalSize = _.last(unbalancedChildren).totalSize;
    incorrectTotalSize = _.first(unbalancedChildren).totalSize;
  }

  // Calculate correct size for the node with incorrect size
  const sizeDifference = incorrectTotalSize - correctTotalSize;
  const badNode = _.find(unbalancedChildren, {totalSize: incorrectTotalSize});
  const correctNodeSize = badNode.size - sizeDifference;

  return correctNodeSize;
}
