import { Queue } from './queue';

export class DirectedGraph {
  nodes: Node[];

  constructor() {
    // Create a set of test data
    let count = 6;
    let nodes = [];
    for (let i = 1; i <= count; i++) {
      nodes.push(new Node(i));
    }

    const rand = () => Math.floor(Math.random() * 100) % count;

    for (let i = 0; i < 5; i++) {
      // Associate two random nodes
      let a = nodes[rand()];
      let b = nodes[rand()];

      a.children.push(b);
    }

    this.nodes = nodes;
  }

  toString() {
    let str = '';
    for (let node of this.nodes) {
      str += `${node.data} | ${node.children.map(c => c.data)}\n`;
    }
    return str;
  }
}

export class Node {
  constructor(
    public data: any,
    public children: Node[] = []
  ) {}
}

export function dfs(root: any, val: any) {
  if (root === undefined) return;
  if (root.data = val) return root;

  root.visited = true;
  for (let node of root.children) {
    if (node.visited === false) {
      dfs(node, val);
    }
  }
}

export function bfs(root: any, val: any) {
  const q = new Queue();
  root.visited = true;
  q.enqueue(root);

  while (!q.isEmpty()) {
    let node = q.dequeue();
    if (node.data === val) return node;
    for (let child of node.children) {
      if (!child.visited) {
        child.visited = true;
        q.enqueue(child);
      }
    }
  }
}
