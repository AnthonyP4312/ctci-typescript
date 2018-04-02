import { DirectedGraph } from './graph';
import { Queue } from './queue';
import { Node, printBinTree } from './tree';
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

  const run = (arr: number[], parent: Node, left: boolean) => {
    let node = new Node(null, parent);
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
let tree = new Node(null, null);
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
