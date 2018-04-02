

let t = '┣';
let pipe = '┃';
let tail = '┗';
// export function printTree(root: any, indent = '') {
//   console.log(root);
//   if (root === undefined) return;
//   console.log(indent + root.data);

//   root.visited = true;
//   for (let node of root.children) {
//     if (node.visited === false) {
//       printTree(node, indent + '  ');
//     }
//   }
// }

export function printBinTree(root: any, indent = '') {
  if (root === undefined) return;
  printBinTree(root.left, indent + '   ');
  console.log(indent + root.data);
  printBinTree(root.right, indent + '   ');
}


export class Node {
  left: Node;
  right: Node;

  constructor(
    public data: any,
    public parent: Node | null
  ) { }
}

export class BinarySearchTree{
  root: Node;

  constructor(data: any) {
    this.root = new Node(data, null);
  }


}
