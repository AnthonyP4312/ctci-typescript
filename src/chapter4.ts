import { DirectedGraph, GNode } from './graph';
import { Queue } from './queue';
import { Node, printBinTree, BinarySearchTree } from './tree';
import { List } from './list';

// 4.1
// Find if there is a path from a to b or b to a
function findPath(a: any, b: any) {
  const aq = new Queue();
  a.visited = 'a';
  aq.enqueue(a);
  const bq = new Queue();
  b.visited = 'b';
  bq.enqueue(b);

  while (!aq.isEmpty()) {
    let node = aq.dequeue();
    // console.log(`${node.data} === ${b.data}`);
    if (node === b) return true;

    for (let child of node.children) {
      if (child.visited !== 'a') {
        child.visited = 'a';
        aq.enqueue(child);
      }
    }
  }

  while (!bq.isEmpty()) {
    let node = bq.dequeue();    
    // console.log(`${node.data} === ${a.data}`);
    if (node === a) return true;

    for (let child of node.children) {
      if (child.visited !== 'b') {
        child.visited = 'b';
        bq.enqueue(child);
      }
    }
  }
  return false;
}

let graph = new DirectedGraph();
console.log(graph.toString());
console.log(findPath(graph.nodes[0], graph.nodes[1]));


// 4.2
// BST from Sorted Array
function minTree(array: number[], root: any) {
  let midIndex = Math.floor(array.length / 2);
  root.data = array[midIndex];

  const run = (arr: number[], parent: GNode, left: boolean) => {
    let node = new GNode(null, parent);
    let mid;
    if (arr.length === 0) {
      return;
    } else if (arr.length === 1) {
      node.data = arr[0];
      mid = 0;
    } else {
      mid = Math.floor(arr.length / 2);
      node.data = arr[mid];
    }
    if (left) {
      parent.left = node;
    } else {
      parent.right = node;
    }
    run(arr.slice(0, mid), node, true);
    run(arr.slice(mid + 1, arr.length), node, false);
  };
  run(array.slice(0, midIndex), root, true);
  run(array.slice(midIndex + 1, array.length), root, false);
}

// let numbers = new Array(999999).fill(1);
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => x * 10);
let tree = new GNode(null, null);
minTree(numbers, tree);
printBinTree(tree);

// 4.3
// List of Depths
let lists: any[] = [];
function listBinTree(root: any, depth = 0) {
  if (root === undefined) return;
  visit(root, depth);
  listBinTree(root.left, depth + 1);
  listBinTree(root.right, depth + 1);
}

function visit(node: any, index: number) {
  if (lists[index]) {
    lists[index].add(node.data);
  } else {
    lists[index] = new List();
    visit(node, index);
  }
}

// listBinTree(tree);
// // console.log(lists);
// for (let list of lists) {
//   console.log(list.toString());
// }

// 4.4
// Check if a binary tree is balanced
function isBalanced(root: any) {
  let bal = true;

  const run = (node: any) => {
    if (node !== undefined) {
      let diff = Math.abs(height(node.left) - height(node.right));

      if (diff <= 1) {
        run(node.left);
        run(node.right);
      } else {
        bal = false;
      }
    }
  };

  run(root.left);
  run(root.right);
  return bal;
}

function isBalanced2(root: any) {
  let bal = true;

  const run = (node: any) => {
    if (node !== undefined) {
      run(node.left);
      run(node.right);

      let diff = Math.abs(height(node.left) - height(node.right));

      if (diff > 1) {
        bal = false;
      }
    }
  };

  run(root.left);
  run(root.right);
  return bal;
}

function height2(root: any): any {
  if (root === undefined) return 0;
  if (root.height) return root.height;
  if (!root.left && !root.right) {
    root.height = 0;
  } else if (!root.left) {
    root.height = height2(root.right);
  } else if (!root.right) {
    root.height = height2(root.left);
  } else {
    let left = height2(root.left);
    let right = height2(root.right);
    root.height = right > left ? right + 1 : left + 1;
  }

  return root.height;
}

function height(root: any): number {
  if (root === undefined) return 0;
  let acc = 0;

  const run = (node: any, depth: number) => {
    if (node === undefined) {
      if (acc < depth) acc = depth;
    } else {
      run(node.left, depth + 1);
      run(node.right, depth + 1);
    }
  };
  run(root.left, 0);
  run(root.right, 0);

  return acc;
}

// balanced
// console.time();
// console.log(isBalanced(tree));
// let leaf = tree.left;
// while (leaf.left) leaf = leaf.left;
// leaf.left = new Node(99, leaf);
// leaf.left.left = new Node(99, leaf.left);
// // unbalanced
// console.log(isBalanced(tree));
// console.timeEnd();

// balanced
// console.time();
// console.log(isBalanced2(tree));
// let leaf = tree.left;
// while (leaf.left) leaf = leaf.left;
// leaf.left = new Node(99, leaf);
// leaf.left.left = new Node(99, leaf.left);
// // unbalanced
// console.log(isBalanced2(tree));
// console.timeEnd();

// 4.5
// Validate a BST
function validate(root: any) {
  let valid = true;

  const run = (node: any) => {
    if (node.left) {
      console.log(node.data, node.left.data, node.parent.data);
      if (node.left.data < node.data && node.left.data < node.parent.data) {
        run(node.left);
      } else {
        valid = false;
      }
    }

    if (node.right) {
      console.log(node.data, node.right.data, node.parent.data);
      if (node.right.data > node.data && node.right.data > node.parent.data) {
        run(node.right);
      } else {
        valid = false;
      }
    }
  };
  run(root.left);
  run(root.right);
  return valid;
}

// setTimeout(() => {
//   console.log(validate(tree));
//   tree.left.right.data = 10;
//   printBinTree(tree);
//   console.log(validate(tree));
// }, 500);


function succ(node: any): any {
  if (node.right) {
    node = node.right;
    while (node.left && node.left.left) node = node.left;
    // console.log(node);
    return node.left ? node.left : node;
  } else if (node.parent.left === node) {
    return node.parent;
  } else if (node.parent.right === node) {
    return node.parent.parent;
  } else {
    return succ(node.parent);
  }
}

console.log(tree.left.right);
console.log(succ(tree.left.right));


// 4.7
// Generate build order
function buildOrder(proj: any, deps: any) { 
  let nodes = proj.reduce((acc, val) => {
    acc[val] = {children: new Set(), parents: new Set()};
    return acc;
  }, {});

  let depList = deps.reduce((acc, [dep, project]) => {
    acc[dep].children.add(project);
    acc[project].parents.add(dep);
    return acc;
  }, nodes);

  let q = new Queue();
  let built = [];

  proj.forEach(project => {
    if (project.parents.size === 0) {
      q.enqueue(project);
      built.push(project);
    }
  });

  if (q.isEmpty()) {
    throw new Error('Circular Dependencies');
  }

  while (!q.isEmpty()) {
    let project = q.dequeue();

    
  }

}

function buildOrder2(projects, deps) {
  let order = [];

  const run = project => {
    for (let [d, p] of deps) {
      if (project === p) {
        run(d);
      } else {

      }
    }
    order.push(project);
  };
}

function buildOrder3(projects, deps) {
  let built = new Set();
  let unbuilt = new Set(projects);

  while (unbuilt.size > 0) {
    let project = projects.shift();
    for (let i = 0; i < deps.length; i++) {
      if (deps[i][1] === project) {
        if (built.has(deps[i][0])) {
          // dependency has been met
          // remove from list
          deps.slice(i--, 1);
        } else {
          deps.push(project);
          break;
        }
      }

      if (i + 1 === deps.length) {
        // No dependencies found
        built.add(project);
      }
    }
  }
}

function buildOrder4(projects, deps) {
  let nodes = projects.reduce((acc, proj) => {
      acc[proj] = new GNode(proj);
      return acc;
    }, {});

  let graph = deps.reduce((acc, [dep, proj]) => {
    acc[dep].children.push(proj);
    return acc;
  });

  



}

let projectList = ['a', 'b', 'c', 'd', 'e', 'f'];
let dependencyList = [
  ['a', 'd'],
  ['f', 'b'],
  ['b', 'd'],
  ['f', 'a'],
  ['d', 'c'],
];
console.log(buildOrder(projectList, dependencyList));


// 4.8
// First Common Ancestor

function firstAncestor(a, b) {
  const height = (n, h = 0) => n.parent !== null ? height(n.parent, ++h) : h;

  let adepth = height(a);
  let bdepth = height(b);

  
  if (adepth > bdepth) {
    for (let i = 0; i < (adepth - bdepth); i++) {
      a = a.parent;
    }
  } else {
    for (let i = 0; i < (bdepth - adepth); i++) {
      b = b.parent;
    }
  }

  do {
    if (a.parent === b.parent) {
      return a.parent;
    } else {
      a = a.parent;
      b = b.parent;
    }
  } while (a.parent !== null && b.parent !== null);
}

// 4.9 
// BST Sequences
function bstSequences(node) {
  if (node === undefined) return;
  if (seqs === []) {
    seqs.push([node.data]);
  }

  let seqsL = JSON.parse(JSON.stringify(seqs));
  let seqsR = JSON.parse(JSON.stringify(seqs));

  if (node.left) {
    seqsL = seqs.map(s => s.push(node.left.data));
  }

  if (node.right) {
    seqsR = seqs.map(s => s.push(node.right.data));
  }

  if (seqsL) {
    seqs = seqsL.concat(seqsR);
  } else {
    seqs = seqsR;
  }

  bstSequences(node.left);
  bstSequences(node.right);
}

function bstSequences2(node) {
  if (node === undefined) return;
  if (seqs === []) {
    seqs.push([node.data]);
  }

  let seqsL = JSON.parse(JSON.stringify(seqs));
  let seqsR = JSON.parse(JSON.stringify(seqs));

  // This doesnt work because push returns the length of the array ahhahahaahahkillmeplease
  if (node.left && node.right) {
    seqsL = seqs.map(s => s.push(node.left.data));
    seqsR = seqs.map(s => s.push(node.right.data));
    seqs = seqsL
      .map(s => s.push(node.right.data))
      .concat(seqsR.map(s => s.push(node.left.data)));
  } else if (node.left) {
    seqs = seqs.map(s => s.push(node.left.data));
  } else if (node.right) {
    seqs = seqs.map(s => s.push(node.left.data));
  }

  bstSequences(node.left);
  bstSequences(node.right);
}
let seqs = [];


// 4.10
// Check subtree
// do BFS to find if subtree root exists in tree (cheating solution)
function checkSubtree(t1, t2) {
  const q = new Queue();
  q.enqueue(t1);

  while (!q.isEmpty()) {
    let node = q.dequeue();
    if (node === t2) {
      return true;
    }
    
    for (let child of node.children) {
      if (!child.visited) {
        child.visited = true;
        q.enqueue(child);
      }
    }
  }
  return false;
}

// 4.11
// Random node
// Implement tree as arrayList-backed binary heap
// insert = push 
// find = o(n) search
// delete = move last val to index, delete last val
function randomNode(tree) {
  return tree[Math.floor(Math.random() * tree.length * 10) % tree.length];
}

// 4.12
// Paths with Sum
// DFS storing the sums along with a string of the paths ex 'LRLL, 21' 
function pathsOfSum(node, target, [path, sum]) {
  sum = node.data + sum;

  if (target === sum) {
    list.push(path);
  }

  if (node.left) {
    pathsOfSum(node.left, target, [path + 'L', sum]);
  }
  if (node.right) {
    pathsOfSum(node.right, target, [path + 'R', sum]);
  }
}
let list = [];
let node = new BinarySearchTree(20);
pathsOfSum(node, 20, ['', 0]);
